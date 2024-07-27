export const handleOnLoadImage = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  const image = event.currentTarget
  image.classList.remove("opacity-0")
}
