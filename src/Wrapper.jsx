export function Wrapper({ children, className, as : Component ='div' }) {
  return (
    <Component className={"px-4 sm:px-8 lg:px-8 " + className}>
      {children}
    </Component>
  )
}
