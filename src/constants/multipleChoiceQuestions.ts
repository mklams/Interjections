
export interface MultipleChoiceQuestion{
    Question: string;
    Options: string[];
    Answers: string[];
    Level: number;
    Response?: string;
    Metadata?: string;
}

export const QuestionBank: MultipleChoiceQuestion[] = [
    {
        Question: "Select the verb",
        Options: ["I", "Run", "And", "Silly"],
        Answers: ["Run"],
        Level: 1,
    },
    {
        Question: "Select the conjunctions",
        Options: ["And", "Eat", "Smelly", "Beef"],
        Answers: ["And"],
        Level: 1,
    },
    {
        Question: "Select the adjective",
        Options: ["I", "Eat", "Scary", "Beats"],
        Answers: ["Scary"],
        Level: 1,
    },
    {
        Question: "Select the noun",
        Options: ["They", 'want', 'truck', "but"],
        Answers: ["truck"],
        Level: 1,
    },
    {
        Question: "In his laudatory _____, the food columnist captured the spirit of the hotel dinning room.",
        Options: ["homage","paean","banter","denunciation","rebuff","examination"],
        Answers: ["homage","paean"],
        Metadata:"Haplan GRE Verbal Workbook 8th Ed, pg.51",
        Level: 4,
    },
    {
        Question: "As a child, he was often lost in thought; consequently, as an adult, his contemporaries described him as",
        Options: ["surly","pensive","meditative","indigenous","arcane","livid"],
        Answers: ["pensive","meditative"],
        Metadata:"Haplan GRE Verbal Workbook 8th Ed, pg.51",
        Level: 3,
    },
    {
        Question: "Possessed of an insatiable sweet tooth, Jim enjoyed all kinds of candy, but he had a special _____ for gumdrops, his absolue favorite.",
        Options: ["container", "affinity", "odium", "nature","disregard","predilection"],
        Answers: ["affinity","predilection"],
        Response: "Yum!",
        Level: 2,
    },
    {
        Question: "Upon visiting the Middle East in 1850, Gustave Flaubert was so _____ belly dancing that he wrote, in a letter to his mother, that the dancers alone made his trip worthwhile.",
        Options: ["overwhelmed by", "enamored by", "taken aback by", "beseeched by","flustered by"],
        Answers: ["enamored by"],
        Level: 2,
    },
    {
        Question: "The twins' heredity and upbringing were identical in nearly every respect, yet one child remained unfailingly sanguine even in times of stress while her sister was prone to angry outbursts that indicated an exceptionally choleric _______.",
        Options: ["genotype", "environment", "physiognomy", "incarnation", "temperament","humor"],
        Answers: ["temperament", "humor"],
        Level: 2,
    },
    {
        Question: "The travel writer’s ______________ towards others he met on his cross-country trip most likely endeared him only to those readers with a misanthropic bent.",
        Options: ["diffidence", "humility", "cynicism", "garrulity", "obsequiousness"],
        Answers: ["cynicism"],
        Level: 3,
    },
    {
        Question: "With characteristic ____________, H.L. Mencken skewered the sacred cows of his time, criticizing social trends and government institutions with equal asperity.",
        Options: ["hauteur", "playfulness", "vitriol", "civility", "dash"],
        Answers: ["vitriol"],
        Response: "Ouch! I hope the cows are okay",
        Level: 3,
    },
    {
        Question: "Unlike the performances of her youth, in which she seamlessly inhabited a role, the performances of her later years were ____________, as though she were calling out to audiences, “look how convincingly I can portray my character.”",
        Options: ["decrepit", "comical", "volatile", "mechanical", "contrived"],
        Answers: ["contrived"],
        Response: "Well! She's still my favorite actress!",
        Level: 2,
    },
    {
        Question: "The young man always had to have the last word; he would rather be disliked than ___________.",
        Options: ["gainsaid", "selfish", "remembered", "praised", "different"],
        Answers: ["gainsaid"],
        Response: "Hey! That young man sounds mean!",
        Level: 4,
    },
    {
        Question: "Although it does contain some pioneering ideas, one would hardly characterize the work as __________.",
        Options: ["orthodox", "eccentric", "original", "trifling", "conventional","innovative"],
        Answers: ["original","innovative"],
        Response: "Aww! I was looking forward to reading it.",
        Level: 2,
    },
    {
        Question: "The corporation expects only _______ increases in sales next year despite a yearlong effort to revive its retailing business.",
        Options: ["dynamic", "predictable", "expanding", "modest", "slight","volatile"],
        Answers: ["modest","slight"],
        Response: "Drats! I invested my money in them.",
        Level: 2,
    },
    {
        Question: "It was her view that the country's problems had been _______ by foreign technocrats, so that to ask for such assistance again would be counterproductive.",
        Options: ["ameliorated", "ascertained", "diagnosed", "exacerbated", "overlooked","worsened"],
        Answers: ["exacerbated","worsened"],
        Level: 4,
    },
    {
        Question: "After being bedridden for months, James found that his muscles had atrophied, which initially _______ his ability to walk or lift heavy objects.",
        Options: ["belittled", "castigated", "hampered", "bolstered", "curtailed","improved"],
        Answers: ["hampered","curtailed"],
        Level: 3,
    },
    {
        Question: "Nancy’s landlord told her and her housemates that because of their failure to pay rent for the previous two months, they would need to _____ possession of the residence by the end of the week.",
        Options: ["allocate", "surrender", "mandate", "designate", "relinquish","circumvent"],
        Answers: ["surrender","relinquish"],
        Response: "Yikes! I hope Nancy is okay.",
        Level: 2,
    },
    {
        Question: "Dreams are ________ in and of themselves, but, when combined with other data, they can tell us much about the dreamer.",
        Options: ["astonishing", "disordered", "harmless", "inscrutable", "revealing","uninformative"],
        Answers: ["inscrutable","uninformative"],
        Response: "Hey! Don't let you dreams be dreams!",
        Level: 4,
    },
];