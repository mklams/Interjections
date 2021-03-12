
export interface MultipleChoiceQuestion{
    Question: string;
    Options: string[];
    Answers: string[];
    Response?: string;
    Metadata?: string;
}

export const QuestionBank: MultipleChoiceQuestion[] = [
    {
        Question: "Select the verb",
        Options: ["I", "Run", "And", "Silly"],
        Answers: ["Run"]
    },
    {
        Question: "Select the conjunctions",
        Options: ["And", "Eat", "Smelly", "Beef"],
        Answers: ["And"]
    },
    {
        Question: "Select the adjective",
        Options: ["I", "Eat", "Scary", "Beats"],
        Answers: ["Scary"]
    },
    {
        Question: "Select the noun",
        Options: ["They", 'want', 'truck', "but"],
        Answers: ["truck"]
    },
    {
        Question: "In his laudatory _____, the food columnist captured the spirit of the hotel dinning room.",
        Options: ["homage","paean","banter","denunciation","rebuff","examination"],
        Answers: ["homage","paean"],
        Metadata:"Haplan GRE Verbal Workbook 8th Ed, pg.51"
    },
    {
        Question: "As a child, he was often lost in thought; consequently, as an adult, his contemporaries described him as",
        Options: ["surly","pensive","meditative","indigenous","arcane","livid"],
        Answers: ["pensive","meditative"],
        Metadata:"Haplan GRE Verbal Workbook 8th Ed, pg.51"
    },
    {
        Question: "Possessed of an insatiable sweet tooth, Jim enjoyed all kinds of candy, but he had a special _____ for gumdrops, his absolue favorite.",
        Options: ["container", "affinity", "odium", "nature","disregard","predilection"],
        Answers: ["affinity","predilection"],
        Response: "Yum!"
    },
    {
        Question: "Upon visiting the Middle East in 1850, Gustave Flaubert was so _____ belly dancing that he wrote, in a letter to his mother, that the dancers alone made his trip worthwhile.",
        Options: ["overwhelmed by", "enamored by", "taken aback by", "beseeched by","flustered by"],
        Answers: ["enamored by"],
    },
    {
        Question: "The twins' heredity and upbringing were identical in nearly every respect, yet one child remained unfailingly sanguine even in times of stress while her sister was prone to angry outbursts that indicated an exceptionally choleric _______.",
        Options: ["genotype", "environment", "physiognomy", "incarnation", "temperament","humor"],
        Answers: ["temperament", "humor"]
    },
    {
        Question: "The travel writer’s ______________ towards others he met on his cross-country trip most likely endeared him only to those readers with a misanthropic bent.",
        Options: ["diffidence", "humility", "cynicism", "garrulity", "obsequiousness"],
        Answers: ["cynicism"]
    },
    {
        Question: "With characteristic ____________, H.L. Mencken skewered the sacred cows of his time, criticizing social trends and government institutions with equal asperity.",
        Options: ["hauteur", "playfulness", "vitriol", "civility", "dash"],
        Answers: ["vitriol"],
        Response: "Ouch! I hope the cows are okay"
    },
    {
        Question: "Unlike the performances of her youth, in which she seamlessly inhabited a role, the performances of her later years were ____________, as though she were calling out to audiences, “look how convincingly I can portray my character.”",
        Options: ["decrepit", "comical", "volatile", "mechanical", "contrived"],
        Answers: ["contrived"],
        Response: "Well! She's still my favorite actress!"
    },
    {
        Question: "The young man always had to have the last word; he would rather be disliked than ___________.",
        Options: ["gainsaid", "selfish", "remembered", "praised", "different"],
        Answers: ["gainsaid"],
        Response: "Hey! That young man sounds mean!"
    },
    {
        Question: "Although it does contain some pioneering ideas, one would hardly characterize the work as __________.",
        Options: ["orthodox", "eccentric", "original", "trifling", "conventional","innovative"],
        Answers: ["original","innovative"],
        Response: "Aww! I was looking forward to reading it."
    },
    {
        Question: "The corporation expects only _______ increases in sales next year despite a yearlong effort to revive its retailing business.",
        Options: ["dynamic", "predictable", "expanding", "modest", "slight","volatile"],
        Answers: ["modest","slight"],
        Response: "Drats! I invested my money in them."
    },
    {
        Question: "It was her view that the country's problems had been _______ by foreign technocrats, so that to ask for such assistance again would be counterproductive.",
        Options: ["ameliorated", "ascertained", "diagnosed", "exacerbated", "overlooked","worsened"],
        Answers: ["exacerbated","worsened"]
    },
    {
        Question: "After being bedridden for months, James found that his muscles had atrophied, which initially _______ his ability to walk or lift heavy objects.",
        Options: ["belittled", "castigated", "hampered", "bolstered", "curtailed","improved"],
        Answers: ["hampered","curtailed"]
    },
    {
        Question: "Nancy’s landlord told her and her housemates that because of their failure to pay rent for the previous two months, they would need to _____ possession of the residence by the end of the week.",
        Options: ["allocate", "surrender", "mandate", "designate", "relinquish","circumvent"],
        Answers: ["surrender","relinquish"],
        Response: "Yikes! I hope Nancy is okay."
    },
    {
        Question: "Dreams are ________ in and of themselves, but, when combined with other data, they can tell us much about the dreamer.",
        Options: ["astonishing", "disordered", "harmless", "inscrutable", "revealing","uninformative"],
        Answers: ["inscrutable","uninformative"],
        Response: "Hey! Don't let you dreams be dreams!"
    },
];