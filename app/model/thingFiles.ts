export class ThingFiles {
    schema: string;
    manifest: string;
    deviceTranslator: string;
    packageJson: string;
    voice: string;
    onboarding: string;

    public toList(): string[] {
        let list: string[] = [];

        list.push(this.schema);
        list.push(this.manifest);
        list.push(this.deviceTranslator);
        list.push(this.packageJson);
        list.push(this.voice);
        list.push(this.onboarding);

        return list;
    }
}