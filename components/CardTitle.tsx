export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="[text-shadow:_0_5px_0_rgba(0_0_0_/_15%)] mb-4 md:mb-6 text-center -rotate-3 font-shantell italic text-3xl md:text-4xl font-medium truncate">
      {children}
    </h3>
  )
}
