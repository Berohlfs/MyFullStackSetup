// Components
import { ToggleTheme } from "./components/ToggleTheme"
import { LoginForm } from "./components/LoginForm"

export default function Home() {

  return (
    <main>
      <ToggleTheme/>
      <LoginForm/>
    </main>
  )
}
