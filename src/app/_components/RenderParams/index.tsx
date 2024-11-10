import { Suspense } from 'react'

import { Props, RenderParamsComponent } from './Component'

/**
 * RenderParams bileşeni, `RenderParamsComponent` bileşenini `Suspense` içinde sarar.
 * `useSearchParams` kullanımı nedeniyle, Next.js bu bileşeni istemci tarafında render etmeye zorlar.
 * `Suspense` ile bu bileşen yavaş yükleme durumlarında fallback sağlar.
 * Daha fazla bilgi için: https://nextjs.org/docs/messages/deopted-into-client-rendering
 */
export const RenderParams: React.FC<Props> = props => (
  <Suspense fallback={null}>
    <RenderParamsComponent {...props} />
  </Suspense>
)
