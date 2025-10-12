'use client'

import * as React from 'react'
import * as Recharts from 'recharts'
import { cn } from '@/lib/utils'

// ---------------------------
// Tipos y Configuración
// ---------------------------

const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error('useChart must be used within a <ChartContainer />')
  return context
}

// ---------------------------
// Chart Container
// ---------------------------

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ReactElement
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

// ---------------------------
// Chart Style
// ---------------------------

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c.color || c.theme
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`)
          .join('\n'),
      }}
    />
  )
}

// ---------------------------
// Chart Tooltip
// ---------------------------

const ChartTooltip = Recharts.Tooltip

// @ts-ignore - Recharts types conflict with Next.js 15
function ChartTooltipContent(props: any) {
  const { 
    active, 
    payload, 
    label, 
    className, 
    indicator = 'dot', 
    hideLabel = false, 
    hideIndicator = false, 
    labelFormatter, 
    labelClassName, 
    formatter, 
    color, 
    nameKey, 
    labelKey 
  } = props
  
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null
    const item = payload[0]
    const key = labelKey || item?.dataKey || item?.name || 'value'
    const itemConfig = config[key as keyof typeof config]
    const value = label && typeof label === 'string' ? itemConfig?.label || label : itemConfig?.label
    if (!value) return null
    if (labelFormatter) return <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>
    return <div className={cn('font-medium', labelClassName)}>{value}</div>
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

  if (!active || !payload?.length) return null

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div className={cn('border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl', className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => {
          const key = nameKey || item.name || item.dataKey || 'value'
          const itemConfig = config[key as keyof typeof config]
          const indicatorColor = color || item.payload?.fill || item.color

          return (
            <div key={item.dataKey || index} className={cn('[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5', indicator === 'dot' && 'items-center')}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                          {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed',
                          }
                        )}
                        style={{ '--color-bg': indicatorColor, '--color-border': indicatorColor } as React.CSSProperties}
                      />
                    )
                  )}
                  <div className={cn('flex flex-1 justify-between leading-none', nestLabel ? 'items-end' : 'items-center')}>
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                    </div>
                    {item.value && <span className="text-foreground font-mono font-medium tabular-nums">{item.value.toLocaleString()}</span>}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------
// Chart Legend
// ---------------------------

const ChartLegend = Recharts.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: React.ComponentProps<'div'> & { 
  payload?: any[]
  hideIcon?: boolean
  verticalAlign?: 'top' | 'bottom'
  nameKey?: string 
}) {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div className={cn('flex items-center justify-center gap-4', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className)}>
      {payload.map((item: any) => {
        const key = nameKey || item.dataKey || 'value'
        const itemConfig = config[key as keyof typeof config]
        return (
          <div key={item.value} className="[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3">
            {itemConfig?.icon && !hideIcon ? <itemConfig.icon /> : <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------
// Exports
// ---------------------------

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}