import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "angular2/http";
import "rxjs/Rx";
import {GenericGitHubDataService} from "./genericGitHubDataService";
import {ThingFiles} from "../model/thingFiles";

interface ThingsType {
    name: string;
    schema: string;
    things: string[];
}

@Injectable()
export class SearchDataService {

    // defines the base URLs for queries to the repos 
    private TRANSLATOR_BASEURL = "https://api.github.com/repos/opent2t/translators/contents";
    private VOICE_BASEURL = "https://api.github.com/repos/opent2t/voice/contents";
    private ONBOARDING_BASEURL = "https://api.github.com/repos/opent2t/onboarding/contents";

    // ctor
    constructor(private http: Http, private genericGitHubDataService: GenericGitHubDataService) {
    }

    // for a given search keyword (thing name), initiates getting the list of files from the repository.
    // input: name of the thing (we do exact matching)
    // return values: 
    //               the schema XML file
    //               manifest.xml
    //               thingTranslator.js
    //               package.json (this and aboves are from translators)
    //               the Cortana VCD XML file (from voice repo)
    //               the onboarding XML file if exists (from onboarding repo)
    public initiateGetFilesListBySearch(name: string): Promise<ThingFiles> {

        let files: ThingFiles = new ThingFiles();
        let thingsTypes: ThingsType[] = new Array();
        let manifestContent: string = null;
        let voices: string[] = new Array();
        let voiceName: string = null;

        return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.TRANSLATOR_BASEURL) // top-level of translators
            .then((data) => {
                let schemas: string[] = data;
                schemas.forEach(s => {
                    let type: ThingsType = { name: "", schema: "", things: new Array() };
                    type.name = s;
                    thingsTypes.push(type);
                });

                return Promise.all(thingsTypes.map((t) => {
                    return this.genericGitHubDataService.initiateGetDirectoriesAndFilesInPath(this.TRANSLATOR_BASEURL + "/" + t.name) // second-level of translators
                        .then((data) => {
                            let things: string[] = data;
                            things.forEach(thing => {
                                if (thing.endsWith(".xml"))
                                    t.schema = thing;
                                else
                                    t.things.push(thing);
                            });
                        }).catch((err) => {
                            return Promise.reject<ThingFiles>(err);
                        });
                }));
            })
            .then(() => {
                let manifest: string = null;
                for (let i = 0; i < thingsTypes.length; i++) { // search for the thing of "name"
                    for (let j = 0; j < thingsTypes[i].things.length; j++) {
                        if (thingsTypes[i].things[j] === name) {
                            let _schema: string = "translators/contents/" + thingsTypes[i].name + "/" + thingsTypes[i].schema;
                            let _js: string = "translators/contents/" + thingsTypes[i].name + "/" + thingsTypes[i].things[j] + "/js/thingTranslator.js";
                            let _json: string = "translators/contents/" + thingsTypes[i].name + "/" + thingsTypes[i].things[j] + "/js/package.json";
                            let _xml: string = "translators/contents/" + thingsTypes[i].name + "/" + thingsTypes[i].things[j] + "/js/manifest.xml";

                            manifest = _xml;
                            files.schema = _schema;
                            files.manifest = _xml;
                            files.deviceTranslator = _js;
                            files.packageJson = _json;

                            break; // return the first match
                        }
                    }
                }

                let path = "https://api.github.com/repos/opent2t/" + manifest;
                return this.genericGitHubDataService.initiateGetFileContentInPath(path) // get the content of the manifest file so that we can decide which voice file to use
                    .then((data) => {
                        manifestContent = data;
                    }).catch((err) => {
                        return Promise.reject<ThingFiles>(err);
                    });
            })
            .then(() => {
                // find the voice name; any better way to do it using regex?
                let x = manifestContent.search("<voice id=");
                let str = manifestContent.substring(x);
                x = str.search("\"");
                str = str.substring(x + 1);
                let y = str.search("\"");
                voiceName = str.substring(0, y);

                return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.VOICE_BASEURL + "/Cortana")
                    .then((data) => {
                        voices = data;
                    }).catch((err) => {
                        return Promise.reject<ThingFiles>(err);
                    });
            })
            .then(() => {
                for (let i = 0; i < voices.length; i++) {
                    if (voices[i] === voiceName) {
                        voiceName = voices[i];
                        break;
                    }
                }

                return this.genericGitHubDataService.initiateGetFilesInPath(this.VOICE_BASEURL + "/Cortana/" + voiceName)
                    .then((data) => {
                        let voiceFiles: string[] = data;
                        voiceFiles.forEach((f) => {
                            files.voice = "voice/contents/Cortana/" + voiceName + "/" + f;
                        });
                    }).catch((err) => {
                        return Promise.reject<ThingFiles>(err);
                    });
            })
            .then(() => {
                // search for the onboarding method file
                let x = manifestContent.search("<onboarding id=");
                let str = manifestContent.substring(x);
                x = str.search("\"");
                str = str.substring(x + 1);
                let y = str.search("\"");
                let method = str.substring(0, y);

                if (method === undefined) {
                    return;
                }
                else {
                    return this.genericGitHubDataService.initiateGetDirectoriesInPath(this.ONBOARDING_BASEURL)
                        .then((data) => {
                            let methods: string[] = data;
                            for (let i = 0; i < methods.length; i++) {
                                if (methods[i] === method) {
                                    // the XML file should have the same name in the folder
                                    files.onboarding = "onboarding/contents/" + method + "/" + method + ".xml";
                                }
                            }
                        }).catch((err) => {
                            return Promise.reject<ThingFiles>(err);
                        });
                }
            })
            .then(() => {
                return Promise.resolve<ThingFiles>(files);
            })
            .catch((err) => {
                return Promise.reject<ThingFiles>(err);
            });
    }

    // given a path, getting the file content from the repository.
    public initiateGetFileContent(path: string): Promise<string> {
        return this.genericGitHubDataService.initiateGetFileContentInPath("https://api.github.com/repos/opent2t/" + path);
    }
}