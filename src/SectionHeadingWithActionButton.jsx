
export function SectionHeadingWithActionButton({ children, Button }) {
  return (
    <div className="py-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
        {children}
      </h3>
      <div>
        <Button />
      </div>
    </div>
  )
}
