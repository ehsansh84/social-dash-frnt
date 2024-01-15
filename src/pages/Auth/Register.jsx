import { useEffect, useRef, useState } from "react"
import { InputWithValidation } from "../../components/InputWithValidation"
import { MessageTransition } from "../../components/MessageTransition"
import { Link } from "react-router-dom"
// import { validatePassword, validateUsername } from "../../utils"
import { InputField } from "../../components/InputField"
import { useRegisterUser } from "../../hooks/useResources"

const validateUsername = () => ({ test: () => true, instructions: [] })
const validatePassword = () => ({ test: () => true, instructions: [] })

export function Register() {
  const registerUser = useRegisterUser()

  const [error, setError] = useState(null)
  const errorRef = useRef()

  // username
  const [username, setUsername] = useState("")
  const [isValidUsername, setIsValidUsername] = useState(false)
  const [isUsernameFocused, setIsUsernameFocused] = useState(false)
  const usernameRef = useRef()

  const [password, setPassword] = useState("")
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const [confirm, setConfirm] = useState("")
  const [isValidConfirm, setIsValidConfirm] = useState(false)
  const [isConfirmFocused, setIsConfirmFocused] = useState(false)

  const [email, setEmail] = useState("")

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    setIsValidUsername(validateUsername(username).test())
  }, [username])

  useEffect(() => {
    setIsValidPassword(validatePassword(password).test())
    const match = password === confirm
    setIsValidConfirm(match)
  }, [password, confirm])

  // clear error after change in fields
  useEffect(() => {
    setError(null)
  }, [username, password, confirm])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidConfirm || !isValidUsername || !isValidPassword) {
      setError({
        status: "danger",
        message: "Your information is not valid!",
      })
      return
    }
    const bodyObject = {
      username,
      email,
      password,
      name:"",
      family:"",
      mobile:""
    }

    registerUser.mutate(bodyObject)
  }

  if (registerUser.isError) {
    console.log(registerUser)
  } else if (registerUser.isSuccess) {
    console.log(registerUser)
  }
  // try {
  //   const response = await axios.post(
  //     REGISTER_URL,
  //     JSON.stringify({ username, password, name, family, email, mobile }),
  //     {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     },
  //   )
  //   console.log(response?.data)
  //   console.log(response?.accessToken)
  //   console.log(JSON.stringify(response))
  //   //clear state and controlled inputs
  //   //need value attrib on inputs for this
  //   setUsername("")
  // } catch (err) {
  //   if (!err?.response) {
  //     setError({
  //       status: "danger",
  //       message: "No Server Response",
  //     })
  //   } else if (err.response?.status === 409) {
  //     setError({
  //       status: "danger",
  //       message: "Username Taken",
  //     })
  //   } else {
  //     setError({
  //       status: "danger",
  //       message: "Registration failed",
  //     })
  //   }
  //   errorRef.current.focus()
  // }
  // }

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto w-20">
          <img
            className="mx-auto h-auto w-full"
            src="/logo.svg"
            alt="Your Company"
          />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <InputWithValidation
              isValid={!username || isValidUsername}
              setValue={setUsername}
              value={username}
              label="Username"
              id="username"
              autoComplete="off"
              placeholder="username"
              inputRef={usernameRef}
              required
              aria-invalid={isValidUsername ? "false" : "true"}
              aria-describedby="username_instruction"
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
            />
            {isUsernameFocused && username && !isValidUsername && (
              <ul id="username_instruction">
                {validateUsername(username).instructions.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <InputField
              type="email"
              setValue={setEmail}
              value={email}
              placeholder="email@example.com"
              label="Email"
              id="email"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <InputWithValidation
              isValid={!password || isValidPassword}
              setValue={setPassword}
              type="password"
              value={password}
              label="Password"
              id="password"
              required
              aria-invalid={isValidPassword ? "false" : "true"}
              aria-describedby="password_instructions"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            {isPasswordFocused && password && !isValidPassword && (
              <ul id="password_instructions">
                {validatePassword(password).instructions.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <InputWithValidation
              isValid={!confirm || isValidConfirm}
              setValue={setConfirm}
              type="password"
              value={confirm}
              label="Confirm Password"
              id="confirm"
              required
              aria-invalid={isValidConfirm ? "false" : "true"}
              aria-describedby="confirm_instructions"
              onFocus={() => setIsConfirmFocused(true)}
              onBlur={() => setIsConfirmFocused(false)}
            />
            {isConfirmFocused && confirm && !isValidConfirm && (
              <p id="confirm_instructions">
                Must match the first password input field.
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to="/signin"
            className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>
      <MessageTransition
        message={error}
        setMessage={setError}
        messageRef={errorRef}
      />
    </section>
  )
}
