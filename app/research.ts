export const enum ResearchId {
    Sex,
    SoilExam,
    Foo2,
    Expedition
}
// CampfireRituals
//   Astrology
//   Fertility
//   Alphabet
//     VillageHeritage
//     Warfare
//       Expedition
// AdvancedCult
//   CulturalAscension
//     MinersUnion
//     UniversityAssociation
//   Telepathy
//
// Devotion
//   AscendingResources

export class Research {
    public id: ResearchId;
    public dependencies: ResearchId[] = [];
    // TODO add non-research dependencies

    public done: boolean = false;

    public name: string;
    public cost: number;
    public description: string;

    public afterDone: () => void = () => {
    };
}

export let allResearches: Map<ResearchId, Research> = new Map<ResearchId, Research>();

function addResearch(id: ResearchId, callback: (research: Research) => void): void {
    let research = new Research();
    research.id = id;
    allResearches.set(id, research);
    callback(research);
}

addResearch(ResearchId.Sex, (research: Research): void => {
    research.name = 'Sex';
    research.cost = 100;
    research.description = 'Important duty and sweet pleasure. Romantic love allowing your village to grow. Basis of any society.';
});

addResearch(ResearchId.SoilExam, (research: Research): void => {
    research.name = 'Soil Exam';
    research.cost = 200;
    research.description = 'The very soil that provides us fat can be analyzed. Finding better places for mines will make them 2× more efficient.';
    research.dependencies.push(ResearchId.Sex);
});

addResearch(ResearchId.Foo2, (research: Research): void => {
    research.name = 'Foo2';
    research.cost = 300;
    research.description = 'Lorem ipsum.';
    research.dependencies.push(ResearchId.Sex);
});

addResearch(ResearchId.Expedition, (research: Research): void => {
    research.name = 'Expedition';
    research.cost = 300;
    research.description = 'Lorem ipsum.';
    research.dependencies.push(ResearchId.SoilExam);
    research.dependencies.push(ResearchId.Foo2);
});
