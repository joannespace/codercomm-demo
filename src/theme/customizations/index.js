import Link from "./Link";
import Card from "./Card";
import Tabs from "./Tabs";

function customizeComponents(theme) {
  return { ...Link(theme), ...Card(theme), ...Tabs(theme) };
}

export default customizeComponents;
