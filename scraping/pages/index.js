import { useState, useEffect } from 'react'
import useSWR from 'swr'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'

const Dropdown = dynamic(
	async () => {
	  const module = await import('reactjs-dropdown-component');
	  const DD = module.Dropdown;
  
	  return ({ forwardedRef, ...props }) => <DD ref={forwardedRef} {...props} />;
	},
	{ ssr: false },
  );


const USERNAME = 'username'
const PASSWORD = 'password'

const getLoginPayload = (providerURL, username, password) => {
	console.log('getPayload: ', { providerURL, username, password })
	return { method: 'POST',
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			// username: 'gernetzkeg',
			// password: 'KzrUkdmZ25xc',
			username,
			password,
			providerURL,
		})
	}
}
const postLogin = ({ url, selectedProvider, username, password, setSubmitLogin}) => fetch(url, getLoginPayload(selectedProvider, username, password)).then((res) => {
	// setSubmitLogin(false)
	return res.json()
})
const getProviders = (url) => fetch(url).then((res) => res.json())

export default function Home() {
	const [selectedProvider, setSelectedProvider] = useState('')
	const [credentials, setCredentials] = useState({ [USERNAME]: '', [PASSWORD]: ''})
	const [submitLogin, setSubmitLogin] = useState(false)
	const { data: providers, error: providersErr } = useSWR('/api/providers', getProviders)
	const { data: login, error: loginErr } = useSWR(submitLogin ? { url: '/api/login', selectedProvider, [USERNAME]: credentials[USERNAME], [PASSWORD]: credentials[PASSWORD], setSubmitLogin } : null, postLogin)
	const updateCredentials = e => {
		setCredentials({...credentials, [e.target.name]: e.target.value})
	}
	const handleSubmit = e => {
		e.preventDefault()
		setSubmitLogin(true)
	}
	console.log({ providers, selectedProvider, credentials, submitLogin, login, loginErr })
	return (
		<div className={styles.container}>
			<Dropdown
				name="providers"
				title="Select Provider"
				list={providers}
				onChange={(item, name) => setSelectedProvider(item.value)}
			/>
			<form onSubmit={handleSubmit}>
				<label>
					username: <input type={'text'} name={USERNAME} onChange={updateCredentials}/>
					password: <input type={'password'} name={PASSWORD} onChange={updateCredentials} />
				</label>
				<input type={'submit'} value={'Submit'} />
			</form>
			{!!loginErr && <span>{`${loginErr}`}</span>}
		</div>
	)
}
