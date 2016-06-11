import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "angular2/http";
import "rxjs/Rx";
import {GenericGitHubDataService} from "./genericGitHubDataService";

@Injectable()
export class OnboardingDataService {

    // defines the base URL for queries to the repo under this path
    private BASEURL = "https://api.github.com/repos/opent2t/onboarding/contents";

    // ctor
    constructor(private http: Http, private genericGitHubDataService: GenericGitHubDataService) {
    }

    // initiates getting the list of onboarding methods from the repository.
    public initiateGetOnboardingMethodsList(): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.BASEURL);
    }

    // given a onboarding method, getting the directory/file list from the repository.
    public initiateGetOnboardingMethod(method: string): Promise<string[]> {

        return this.genericGitHubDataService.initiateGetDirectoriesAndFilesInPath(this.BASEURL + "/" + method);
    }

    // given a onboarding method, getting the list of files of its "node" folder from the repository.
    public initiateGetOnboardingMehtodNodeFiles(method: string): Promise<string[]> {

        let path: string = method + "/node";

        return this.genericGitHubDataService.initiateGetFilesInPath(this.BASEURL + "/" + path);
    }

    // given a path, getting the file content from the repository.
    public initiateGetFileContent(path: string): Promise<string> {

        return this.genericGitHubDataService.initiateGetFileContentInPath(this.BASEURL + "/" + path);
    }

}