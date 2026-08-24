const kilobyte = 1024
const megabyte = 1_048_576
const gigabyte = 1_073_741_824

export function formatFileSize(bytes: number): string {

	if (bytes < 1024) {
		return `${bytes} bytes`;
	} else if (bytes < megabyte) { // Less than 1 MB, so display in kB
		return `${(bytes / kilobyte).toFixed(0)} kB`;
	} else if (bytes < gigabyte) {// Less than 1 GB, display in MB
		return `${(bytes / megabyte).toFixed(2)} MB`;
	} else {
		// wtf mate
		throw new Error("This file is too damn big");
	}
}
