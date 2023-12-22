export function NarrowWrapper({ children, className, as : Component ='div' }) {
  return (
    <Component className={"mx-auto max-w-5xl px-4 sm:px-8 lg:px-8 " + className}>
      {children}
    </Component>
  )
}
