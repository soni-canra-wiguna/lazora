import {Box, Cable, CircuitBoard, Container, Keyboard, Mouse, Proportions, Sticker} from "lucide-react"

export const CATEGORIES = [
  {
    title: "keyboard",
    value: "keyboard",
    image: "/categories/keyboard.png",
    icon: <Keyboard className="size-4" />,
  },
  {
    title: "deskmat",
    value: "deskmat",
    image: "/categories/deskmat.png",
    icon: <Proportions className="size-4" />,
  },
  {
    title: "keycaps",
    value: "keycaps",
    image: "/categories/keycaps.png",
    icon: <Box className="size-4" />,
  },
  {
    title: "coiled cable",
    value: "coiled cable",
    image: "/categories/coiled-cable.png",
    icon: <Cable className="size-4" />,
  },
  {
    title: "mouse",
    value: "mouse",
    image: "/categories/mouse.png",
    icon: <Mouse className="size-4" />,
  },
  {
    title: "switch",
    value: "switch",
    image: "/categories/switch.png",
    icon: <Container className="size-4" />,
  },
  {
    title: "sticker",
    value: "sticker",
    image: "/categories/sticker.png",
    icon: <Sticker className="size-4" />,
  },
  {
    title: "barebone",
    value: "barebone",
    image: "/categories/barebone.png",
    icon: <CircuitBoard  className="size-4" />,
  },
]
