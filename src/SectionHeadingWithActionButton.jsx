export function SectionHeadingWithActionButton({ children, Button }) {
  return (
    <div className="py-5 sm:flex sm:items-center sm:justify-between h-16">
      <h3 className="text-base font-semibold leading-6 text-text">
        {children}
      </h3>
      <div>{Button && <Button />}</div>
    </div>
  )
}
