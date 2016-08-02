import {Storage, LocalStorage} from "ionic-angular";
import {Injectable} from "@angular/core";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/Rx";
import {GitHubFileItem} from "../model/gitHub/gitHubFileItem";
import {GitHubFileContentItem} from "../model/gitHub/gitHubFileContentItem";
import {AuthService} from "./authService";

@Injectable()
export class GenericGitHubDataService {

    local: Storage = new Storage(LocalStorage);

    // ctor
    constructor(private http: Http) {
    }

    // initiates getting the list of directories inside a repository Url.
    public initiateGetDirectoriesInPath(repositoryApiUrl: string): Promise<string[]> {

        // Check if there is an access token saved in local storage
        var promise = this.local.get("github_access_token").then(github_access_token => {

            // configure headers to include the github credential if the user is signed in
            let getHeaders = new Headers();
            let getOptions = new RequestOptions({ headers: getHeaders });
            if (!!github_access_token) {
                getOptions.headers.append("Authorization", "Bearer " + github_access_token);
            }

            return this.http.get(repositoryApiUrl, getOptions)
                .toPromise()
                .then((res) => {
                    return this.handleGetDirectoriesInPath(res);
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                    return Promise.reject<string[]>(err);
                });

        }).catch(error => {
            console.log(JSON.stringify(error));
            return Promise.reject<string[]>(error);
        });

        return promise as Promise<string[]>;
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

        // Check if there is an access token saved in local storage
        var promise = this.local.get("github_access_token").then(github_access_token => {

            // configure headers to include the github credential if the user is signed in
            let getHeaders = new Headers();
            let getOptions = new RequestOptions({ headers: getHeaders });
            if (!!github_access_token) {
                getOptions.headers.append("Authorization", "Bearer " + github_access_token);
            }

            return this.http.get(repositoryApiUrl, getOptions)
                .toPromise()
                .then((res) => {
                    return this.handleGetDirectoriesAndFilesInPath(res);
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                    return Promise.reject<string[]>(err);
                });

        }).catch(error => {
            console.log(JSON.stringify(error));
            return Promise.reject<string[]>(error);
        });

        return promise as Promise<string[]>;
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

        // Check if there is an access token saved in local storage
        var promise = this.local.get("github_access_token").then(github_access_token => {

            // configure headers to include the github credential if the user is signed in
            let getHeaders = new Headers();
            let getOptions = new RequestOptions({ headers: getHeaders });
            if (!!github_access_token) {
                getOptions.headers.append("Authorization", "Bearer " + github_access_token);
            }

            return this.http.get(repositoryApiUrl, getOptions)
                .toPromise()
                .then((res) => {
                    return this.handleGetFilesInPath(res);
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                    return Promise.reject<string[]>(err);
                });

        }).catch(error => {
            console.log(JSON.stringify(error));
            return Promise.reject<string[]>(error);
        });

        return promise as Promise<string[]>;
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

        // Check if there is an access token saved in local storage
        var promise = this.local.get("github_access_token").then(github_access_token => {

            // configure headers to include the github credential if the user is signed in
            let getHeaders = new Headers();
            let getOptions = new RequestOptions({ headers: getHeaders });
            if (!!github_access_token) {
                getOptions.headers.append("Authorization", "Bearer " + github_access_token);
            }

            return this.http.get(repositoryApiUrl, getOptions)
                .toPromise()
                .then((res) => {
                    return this.handleGetFileContentInPath(res);
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                    return Promise.reject<string>(err);
                });

        }).catch(error => {
            console.log(JSON.stringify(error));
            return Promise.reject<string>(error);
        });

        return promise as Promise<string>;
    }

    // handles the get directories and file in path response.
    private handleGetFileContentInPath(res: Response): Promise<string> {

        if (res.status !== 200) {
            console.log("Error: failed to get file content in path \n" + res.text());
            return Promise.reject<string>(res);
        }
        else {

            let content: string = window.atob((<GitHubFileContentItem>JSON.parse(res.text())).content);

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