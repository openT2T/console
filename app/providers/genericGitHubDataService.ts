import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "angular2/http";
import "rxjs/Rx";
import {GitHubFileItem} from "../model/gitHub/gitHubFileItem";
import {GitHubFileContentItem} from "../model/gitHub/gitHubFileContentItem";

@Injectable()
export class GenericGitHubDataService {

    // ctor
    constructor(private http: Http) {
    }

    // initiates getting the list of directories inside a repository Url.
    public initiateGetDirectoriesInPath(repositoryApiUrl: string): Promise<string[]> {

    return this.http.get(repositoryApiUrl)
            .toPromise()
            .then((res) => {
                return this.handleGetDirectoriesInPath(res);
            }).catch((err) => {
                console.log(err.text());
                return Promise.reject<string[]>(err);
            });
    }

    // handles the get directories in path response.
    private handleGetDirectoriesInPath(res: Response): Promise<string[]> {

        if (res.status !== 200) {
            console.log("Error: failed to get directories in path \n" + res.text());
            return Promise.reject<string[]>(res);
        }
        else {
            let files: GitHubFileItem[] = JSON.parse(res.text());
            let schemas: string[] = new Array();
            files.forEach(file => {
                if (file.type === "dir" && !file.name.startsWith(".")) {
                    schemas.push(file.name);
                }
            });

            console.log("Success: Got directories in path.");
            return Promise.resolve<string[]>(schemas);
        }
    }

    // initiates getting the list of directories and files inside a repository Url.
    public initiateGetDirectoriesAndFilesInPath(repositoryApiUrl: string): Promise<string[]> {

        return this.http.get(repositoryApiUrl)
            .toPromise()
            .then((res) => {
                return this.handleGetDirectoriesAndFilesInPath(res);
            }).catch((err) => {
                console.log(err.text());
                return Promise.reject<string[]>(err);
            });
    }

    // handles the get directories and file in path response.
    private handleGetDirectoriesAndFilesInPath(res: Response): Promise<string[]> {

        if (res.status !== 200) {
            console.log("Error: failed to get directories and files in path \n" + res.text());
            return Promise.reject<string[]>(res);
        }
        else {
            let files: GitHubFileItem[] = JSON.parse(res.text());
            let schemas: string[] = new Array();
            files.forEach(file => {
                if (file.type === "dir" || file.type === "file")
                    schemas.push(file.name);
            });

            console.log("Success: Got directories and files in path.");
            return Promise.resolve<string[]>(schemas);
        }
    }

    // initiates getting the list of file inside a repository Url.
    public initiateGetFilesInPath(repositoryApiUrl: string): Promise<string[]> {

        return this.http.get(repositoryApiUrl)
            .toPromise()
            .then((res) => {
                return this.handleGetFilesInPath(res);
            }).catch((err) => {
                console.log(err.text());
                return Promise.reject<string[]>(err);
            });
    }

    // handles the get files in path response.
    private handleGetFilesInPath(res: Response): Promise<string[]> {

        if (res.status !== 200) {
            console.log("Error: failed to get files in path \n" + res.text());
            return Promise.reject<string[]>(res);
        }
        else {
            let files: GitHubFileItem[] = JSON.parse(res.text());
            let schemas: string[] = new Array();
            files.forEach(file => {
                if (file.type === "file")
                    schemas.push(file.name);
            });

            console.log("Success: Got files in path.");
            return Promise.resolve<string[]>(schemas);
        }
    }

    // initiates getting the file content from a repository Url.
    public initiateGetFileContentInPath(repositoryApiUrl: string): Promise<string> {

        return this.http.get(repositoryApiUrl)
            .toPromise()
            .then((res) => {
                return this.handleGetFileContentInPath(res);
            }).catch((err) => {
                console.log(err.text());
                return Promise.reject<string>(err);
            });
    }

    // handles the get directories and file in path response.
    private handleGetFileContentInPath(res: Response): Promise<string> {

        if (res.status !== 200) {
            console.log("Error: failed to get file content in path \n" + res.text());
            return Promise.reject<string>(res);
        }
        else {
            let content: string = atob((<GitHubFileContentItem>JSON.parse(res.text())).content);

            // for XML files, there is a UTF-8 Byte Order Mark (BOM) at the beginning of the file; 
            // remove it so that the file content can be displayed correctly.
            if (content.startsWith("\xEF\xBB\xBF")) {
                content = content.substring(3);
            }

            console.log("Success: Got file content in path.");
            return Promise.resolve<string>(content);
        }
    }

}