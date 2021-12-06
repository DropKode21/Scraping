export default function getProviders(req, res) {
    const providers = [{ label: 'All State', value: 'https://www.allstate.com/'}, { label: 'State Farm', value: 'https://www.statefarm.com/' }, { label: 'Progressive', value: 'https://www.progressive.com/' }, { label: 'Geico', value: 'https://www.geico.com/' }, { label: 'AAA', value: 'https://www.ace.aaa.com/'}]
	try {
        res.status(200).json(providers)
	} 
    catch (error) {
		
	}
}