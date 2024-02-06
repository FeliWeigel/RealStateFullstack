import Icon from "react-icons-kit"
import {spinner9} from 'react-icons-kit/icomoon/spinner9'
import "./Loading.css"

// eslint-disable-next-line react/prop-types
export default function Loading({size}) {
  return (
    <Icon className="loading-sp" icon={spinner9} size={size}></Icon>
  )
}