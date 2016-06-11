import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "angular2/http";
import "rxjs/Rx";
import {GenericGitHubDataService} from "./genericGitHubDataService";

@Injectable()
export class TranslatorsDataService {

    // defines the base URL for queries to the repo under this path
    private BASEURL = "https://api.github.com/repos/opent2t/translators/contents";

    // ctor
    constructor(private http: Http, private genericGitHubDataService: GenericGitHubDataService) {
    }

    // initiates getting the list of schemas from the repository.
    public initiateGetSchemasList(): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.BASEURL);
    }

    // given a schema, getting the list of things and the schema from the repository.
    public initiateGetThingsList(schema: string): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetDirectoriesAndFilesInPath(this.BASEURL + "/" + schema);
    }

    // given a schema, getting the list of things (but not the schema) and the schema from the repository.
    public initiateGetThingsListWithoutSchema(schema: string): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.BASEURL + "/" + schema);
    }

    // given a schema and a thing name, getting the list of files for the thign from the repository.
    public initiateGetThingFiles(schema: string, name: string): Promise<string[]> {

        let path: string = schema + "/" + name + "/js";

        return this.genericGitHubDataService.initiateGetFilesInPath(this.BASEURL + "/" + path);
    }

    // given a path, getting the file content from the repository.
    public initiateGetFileContent(path: string): Promise<string> {

        return this.genericGitHubDataService.initiateGetFileContentInPath(this.BASEURL + "/" + path);
    }

}