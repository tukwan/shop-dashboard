interface HeadingProps {
  title: string
  description: string
}

export function Heading({ title, description }: HeadingProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
