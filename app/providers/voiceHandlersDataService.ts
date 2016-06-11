import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "angular2/http";
import "rxjs/Rx";
import {GenericGitHubDataService} from "./genericGitHubDataService";

@Injectable()
export class VoiceHandlersDataService {

    // defines the base URL for queries to the repo under this path
    private BASEURL = "https://api.github.com/repos/opent2t/voice/contents";

    // ctor
    constructor(private http: Http, private genericGitHubDataService: GenericGitHubDataService) {
    }

    // initiates getting the list of schemas from the repository.
    public initiateGetSchemasList(): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.BASEURL);
    }

    // initiates getting the list of voice handlers of a type from the repository.
    public initiateGetVoiceHandlersList(type: string): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.BASEURL + "/" + type);
    }

    // initiates getting the files of a voice handler of a type from the repository.
    public initiateGetVoiceHandlersFiles(type: string, name: string): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetFilesInPath(this.BASEURL + "/" + type + "/" + name);
    }

    // initiates getting the content of a file from the repository.
    public initiateGetVoiceHandlersFileContent(path: string): Promise<string> {

        return this.genericGitHubDataService.initiateGetFileContentInPath(this.BASEURL + "/" + path);
    }

}