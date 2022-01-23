import { ipfsUpload } from "./uploadToIPFS";
import * as yargs from 'yargs';

const main = async () => {

	let args: string[] = process.argv.slice(2,3);
	if (args.length == 0) {
		// console.log("You need to pass a file as a command line argument.")
		throw new Error("You need to pass a file as a command line argument!")
	}

	let argv = await yargs
        .option('ipfs', {
            demand: false,
	    type: 'string'
        })
        .option('provider', {
            demand: false,
	    type: 'string'
        })
	.option('contract', {
            demand: false,
	    type: 'string'
        })
	.argv;

	let file: string = args[0];
	// // let file: string = path.join(fileToUpload);
	await ipfsUpload(
		file,
		argv.provider,
		argv.ipfs,
		argv.contract
	);
}

main()
	.then(() => process.exit(0))
	.catch((error: Error) => {
		console.error(error);
		process.exit(1);
	});