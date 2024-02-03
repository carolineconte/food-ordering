
export const SectionHeaders = ({ mainHeader, subHeader }) => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-primary text-4xl font-bold
      ">{mainHeader}</h2>
      <h3 className="font-semibold text-secondary text-xl
      sm:text-2xl">{subHeader}</h3>
    </div>
  )
}
