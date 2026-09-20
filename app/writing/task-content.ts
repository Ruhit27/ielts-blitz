export type Table = { head: string[]; rows: string[][] };

export type TaskContent = {
  id: "task-1" | "task-2";
  title: string;
  description: string;
  minutes: number;
  min: number;
  facts: string[];
  typesTitle: string;
  typesIntro: string;
  types: { name: string; blurb: string; icon: string }[];
  questions: { type: string; prompt: string }[];
  tips: { title: string; body: string }[];
  models: { title: string; type: string; prompt: string; table?: Table; text: string; notes: string }[];
  lessons: { title: string; body: string }[];
};

export const task1Content: TaskContent = {
  id: "task-1",
  title: "IELTS Writing Task 1",
  description: "Academic Task 1 lessons, tips and model reports: how to describe data, write a clear overview and reach Band 8.",
  minutes: 20,
  min: 150,
  facts: [
    "You should spend about 20 minutes on Task 1.",
    "Write at least 150 words. Fewer words are penalised, but writing far more wastes time you need for Task 2.",
    "You describe visual information: a chart, graph, table, map or process diagram.",
    "It is marked on four criteria: Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy.",
    "Task 1 is worth about one third of your Writing score. Task 2 is worth two thirds.",
    "You are not asked for an opinion. Report what you see and do not explain why it happened.",
  ],
  typesTitle: "Six types of Task 1 question",
  typesIntro: "Whatever the format, the skills are the same: choose the key features, write an overview and compare with accurate data.",
  types: [
    { name: "Bar charts", blurb: "Compare categories or show change over time. Group the bars and compare highest against lowest.", icon: "M4 20V10M10 20V4M16 20v-7M22 20H2" },
    { name: "Line graphs", blurb: "Show trends over time. Describe the overall direction, peaks, dips and where lines cross.", icon: "M3 17l5-6 4 4 8-9M3 21h18" },
    { name: "Tables", blurb: "Lots of numbers, so select. Never list every cell; pick the highest, lowest and any striking contrast.", icon: "M4 5h16v14H4V5ZM4 10h16M4 15h16M10 5v14" },
    { name: "Pie charts", blurb: "Show proportions of a whole. Compare the largest and smallest slices, and any change between two charts.", icon: "M12 3v9h9M12 3a9 9 0 1 0 9 9" },
    { name: "Process diagrams", blurb: "Show how something is made or works. Use the passive voice and sequencing words to describe each stage.", icon: "M4 6h5v4H4V6ZM15 14h5v4h-5v-4ZM9 8h3a3 3 0 0 1 3 3v3" },
    { name: "Maps", blurb: "Show a place at two or more times. Describe what was added, removed or moved, using position language.", icon: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14" },
  ],
  questions: [
    { type: "Line graph", prompt: "The graph shows the number of visitors to three museums in London between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant." },
    { type: "Bar chart", prompt: "The chart shows the percentage of adults in five countries who took part in regular exercise in 2019. Summarise the information by selecting and reporting the main features, and make comparisons where relevant." },
    { type: "Pie chart", prompt: "The pie charts show how a typical household in one country spent its income in 1990 and in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant." },
    { type: "Process", prompt: "The diagram shows the stages in the production of recycled paper. Summarise the information by selecting and reporting the main features, and make comparisons where relevant." },
    { type: "Map", prompt: "The two maps show a coastal village in 1995 and today. Summarise the information by selecting and reporting the main features, and make comparisons where relevant." },
  ],
  tips: [
    { title: "Always write an overview", body: "The overview is the single most important paragraph. State the two or three biggest trends or contrasts with no detailed numbers. Without one, you cannot score above Band 5 for Task Achievement." },
    { title: "Use a four-paragraph structure", body: "Introduction (paraphrase the question), overview, then two body paragraphs that group related features. One idea per paragraph keeps you clear and coherent." },
    { title: "Select, do not list", body: "You cannot describe everything in 150 words. Choose the highest, the lowest, big changes and interesting comparisons. Group similar items together." },
    { title: "Paraphrase the question, do not copy it", body: "Change 'shows' to 'illustrates' or 'compares', swap 'percentage' for 'proportion', and reorder the sentence. Copied words do not count as your own language." },
    { title: "Get the tenses right", body: "Use the past simple for past dates, the present simple for facts with no date, and the future with 'is predicted to' or 'is expected to' for forecasts. Wrong tense is the most common Task 1 error." },
    { title: "Learn data language", body: "Build a bank for trends (rise, climb, fall, plunge, level off), size (dramatic, gradual, slight) and comparison (twice as high as, considerably lower than). Vary it so you never repeat 'increase'." },
    { title: "Check every number", body: "One wrong figure lowers Task Achievement. Include units (%, million, tonnes) and say 'approximately' when reading between gridlines." },
    { title: "Do not give opinions or reasons", body: "Never write 'this is because' unless the chart tells you. You are a reporter. Explaining causes that are not in the data counts as irrelevant." },
    { title: "Watch your time", body: "Spend 3 minutes planning, 14 writing and 3 checking. Leave time to check figures and tenses." },
  ],
  models: [
    {
      title: "Households with internet access",
      type: "Table",
      prompt: "The table below shows the percentage of households with internet access in four countries in 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      table: {
        head: ["Country", "2005", "2020"],
        rows: [
          ["Japan", "66%", "93%"],
          ["United Kingdom", "70%", "96%"],
          ["Brazil", "14%", "74%"],
          ["Kenya", "3%", "34%"],
        ],
      },
      text: `The table compares the proportion of households with internet access in four countries in 2005 and 2020.

Overall, internet access rose sharply in every country over the period, with the most dramatic growth occurring in the countries that started from the lowest base. By 2020, Japan and the United Kingdom had achieved near-universal coverage.

In 2005, the United Kingdom led with 70% of households connected, closely followed by Japan at 66%. Brazil and Kenya lagged far behind, at 14% and 3% respectively.

By 2020, Japan had climbed by 27 percentage points to 93%, while the United Kingdom reached 96%. Brazil experienced a fivefold increase, reaching 74%, whereas Kenya, despite a more than tenfold rise, remained the least connected country at 34%. Consequently, the gap between the most and least connected countries narrowed from 67 to 62 percentage points.`,
      notes: "The overview names the general trend and the key contrast. Body paragraphs group the countries by starting position, and the data language is precise (fivefold increase, percentage points, lagged far behind).",
    },
    {
      title: "Visitors to three museums",
      type: "Line graph",
      prompt: "The table gives the data behind a line graph of annual visitors (in thousands) to three London museums between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      table: {
        head: ["Museum", "2000", "2005", "2010", "2015", "2020"],
        rows: [
          ["Science", "400", "450", "600", "700", "300"],
          ["History", "550", "500", "480", "520", "250"],
          ["Art", "200", "300", "400", "650", "150"],
        ],
      },
      text: `The graph illustrates how many people visited three London museums, in thousands, at five-year intervals from 2000 to 2020.

Overall, the Science and Art museums grew steadily in popularity until 2015, whereas the History museum stayed fairly stable. However, all three attracted far fewer visitors in 2020.

In 2000, the History museum was the most visited, with 550,000 visitors, compared with 400,000 for Science and just 200,000 for Art. While History numbers drifted down to 480,000 by 2010 before recovering slightly to 520,000, the other two museums climbed consistently.

The Art museum showed the most striking growth, more than tripling to 650,000 in 2015 and almost overtaking Science, which peaked at 700,000. In 2020, however, visitor numbers collapsed everywhere: Science fell to 300,000, History to 250,000 and Art to only 150,000.`,
      notes: "The overview separates the long-term trend from the final-year drop. The paragraphs group the data by time period and use comparative structures (more than tripling, almost overtaking) without listing every value.",
    },
    {
      title: "Recycled paper production",
      type: "Process",
      prompt: "The diagram shows six stages in the production of recycled paper: collection, sorting, pulping, cleaning, pressing and drying. Summarise the information by selecting and reporting the main features.",
      text: `The diagram illustrates how used paper is turned into new recycled paper in six stages.

Overall, the process is linear, starting with waste paper collection and ending with finished sheets, and it involves both mechanical and chemical treatment.

First, used paper is collected from homes and offices and transported to a recycling plant, where it is sorted by quality and any plastic or metal is removed. Next, the sorted paper is mixed with water and chemicals in a large tank and broken down into a soft pulp.

The pulp is then cleaned by passing through screens, which filter out staples, glue and ink. After that, it is spread onto a moving belt and pressed between rollers to squeeze out most of the water. In the final stage, the sheets are heated and dried, and the finished paper is wound onto large reels ready for distribution.`,
      notes: "A process overview states the number of stages and the general nature of the process. The passive voice and sequencing words (first, next, then, after that, in the final stage) carry the whole answer.",
    },
  ],
  lessons: [
    { title: "How to write an overview", body: "Pick the two or three most important trends or contrasts and state them in two sentences with no figures. Start with 'Overall,' and place the paragraph straight after your introduction." },
    { title: "Paraphrasing the question", body: "Change the verb (shows → illustrates), the noun (percentage → proportion) and the word order. Add the time and place from the chart so the reader knows exactly what you are describing." },
    { title: "Describing trends", body: "Pair a verb with an adverb (rose sharply, fell gradually) or an adjective with a noun (a sharp rise, a gradual decline). Use 'peaked at', 'bottomed out at' and 'levelled off at' for turning points." },
    { title: "Comparing data", body: "Use 'twice as high as', 'slightly lower than', 'the highest figure' and 'whereas' to link two data points in a single sentence. Comparison earns more credit than a list." },
    { title: "Approximating numbers", body: "Use 'roughly', 'just over', 'nearly' and 'about a quarter' when the figure is not exact, and say 'one in five' or 'a third' to vary your language." },
    { title: "Writing about time", body: "Use 'between 2000 and 2010', 'over the period', 'by 2020', 'in the following decade'. Match tense to the dates: past for past, future for predictions." },
    { title: "Describing a process", body: "Use the passive voice (the paper is sorted) and sequencing words (first, next, after that, finally). A cycle has no start or end, so say so." },
    { title: "Describing maps", body: "Use 'was replaced by', 'has been converted into', 'to the north of' and 'adjacent to'. Group changes by area rather than by item." },
    { title: "Common mistakes to avoid", body: "Missing overview, listing every number, copying the question, giving reasons for trends, and using the wrong tense for the dates given." },
    { title: "Grouping information", body: "Sort data into two body paragraphs by trend, by category or by period. Never take the categories in the order they appear if a better grouping exists." },
  ],
};

export const task2Content: TaskContent = {
  id: "task-2",
  title: "IELTS Writing Task 2",
  description: "Task 2 essay lessons, tips and Band 8 model answers for every essay type: opinion, discussion, problem and solution, and more.",
  minutes: 40,
  min: 250,
  facts: [
    "You should spend about 40 minutes on Task 2.",
    "Write at least 250 words. A strong essay is usually 270 to 320 words.",
    "Task 2 is worth about two thirds of your Writing score, so it matters more than Task 1.",
    "You respond to a point of view, an argument or a problem, and support your ideas with reasons and examples.",
    "It is marked on Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy.",
    "There are five essay types. Identify the type first, because it decides your structure.",
  ],
  typesTitle: "Five essay types",
  typesIntro: "Read the question carefully and answer every part. If you miss a part, your Task Response score is capped.",
  types: [
    { name: "Opinion (agree or disagree)", blurb: "'To what extent do you agree?' Give one clear position and defend it in both body paragraphs.", icon: "M5 4h14v12H9l-4 4V4Z" },
    { name: "Discuss both views", blurb: "'Discuss both views and give your opinion.' Cover each side fairly, then state your view clearly.", icon: "M12 3v18M4 7h16M6 7l-3 7a3 3 0 0 0 6 0L6 7ZM18 7l-3 7a3 3 0 0 0 6 0l-3-7Z" },
    { name: "Advantages and disadvantages", blurb: "Give both, then say whether the advantages outweigh the disadvantages if the question asks.", icon: "M12 4v16M4 12h16" },
    { name: "Problem and solution", blurb: "'What are the causes and what can be done?' Give one paragraph for each part and be specific.", icon: "M12 3a6 6 0 0 0-3 11.2V17h6v-2.8A6 6 0 0 0 12 3ZM10 20h4" },
    { name: "Two-part question", blurb: "Two direct questions. Answer each one fully in its own body paragraph.", icon: "M9 9a3 3 0 1 1 4.2 2.7c-.8.4-1.2 1-1.2 1.8M12 17h.01" },
  ],
  questions: [
    { type: "Opinion", prompt: "Some people think that children should start learning a foreign language at primary school. To what extent do you agree or disagree?" },
    { type: "Discuss both views", prompt: "Some people believe that governments should spend money on public transport. Others think building more roads is better. Discuss both views and give your own opinion." },
    { type: "Advantages and disadvantages", prompt: "More people now work from home. Do the advantages of this development outweigh the disadvantages?" },
    { type: "Problem and solution", prompt: "In many cities, traffic congestion is getting worse. What are the causes of this problem and what can be done to solve it?" },
    { type: "Two-part question", prompt: "Many young people leave their home town to work elsewhere. Why is this happening? Is it a positive or negative development?" },
  ],
  tips: [
    { title: "Identify the essay type first", body: "Underline the instruction words ('discuss both views', 'to what extent', 'what are the causes'). Each type has its own structure and missing a part costs Task Response marks." },
    { title: "Plan for five minutes", body: "Decide your position and note two main ideas with an example for each before you write. A plan prevents rambling and repeated ideas." },
    { title: "Use a clear four or five paragraph structure", body: "Introduction, two body paragraphs, conclusion. Each body paragraph opens with a clear topic sentence, then explains, then gives an example." },
    { title: "Answer every part of the question", body: "State your opinion in the introduction when asked, and repeat it in the conclusion. Do not sit on the fence unless the question asks you to weigh both sides." },
    { title: "Develop ideas fully", body: "Two well-developed ideas beat four shallow ones. Explain why, add a concrete example, and show the result." },
    { title: "Use linking words with care", body: "Moreover, however and therefore help, but overuse looks mechanical. Use reference words (this, such, these) and clear paragraphing to build flow." },
    { title: "Show a range of vocabulary and grammar", body: "Use topic vocabulary and precise collocations, and mix simple sentences with complex ones (relative clauses, conditionals, passives). Accuracy matters as much as range." },
    { title: "Paraphrase, do not memorise", body: "Examiners recognise memorised paragraphs and template phrases, and penalise them. Write about the actual question." },
    { title: "Keep two minutes to proofread", body: "Check articles, plurals, subject-verb agreement and spelling. A clean essay lifts the Grammar score." },
  ],
  models: [
    {
      title: "Should university be free?",
      type: "Discuss both views",
      prompt: "Some people believe that university education should be free for all students, while others think students should pay for it. Discuss both views and give your own opinion.",
      text: `Whether higher education should be funded by the state or by students themselves is a contentious issue. While I acknowledge the appeal of tuition-free universities, I believe a fairer system is one in which students contribute, provided that support is available for those who cannot afford it.

Advocates of free education argue that it promotes equality of opportunity. When tuition fees are high, talented students from poorer families may abandon their ambitions or graduate with debts that shape their careers for decades. Countries such as Germany, which charge minimal fees, also tend to see a broader cross-section of society in their lecture halls, and the economy benefits from a larger pool of skilled workers.

Nevertheless, there are convincing reasons for asking students to pay. Universities need substantial funding to maintain laboratories, libraries and qualified staff, and if this burden falls entirely on taxpayers, other public services such as healthcare may suffer. Moreover, graduates typically earn more than non-graduates, so it seems reasonable that those who gain most from a degree should share its cost.

In my view, the best solution is a hybrid model in which fees are moderate and repayable only once a graduate's income reaches a reasonable threshold, alongside generous grants for low-income families. This preserves access while keeping universities financially sound.

In conclusion, although free education has clear social benefits, a shared-cost system with strong safeguards offers a more sustainable balance.`,
      notes: "Both views get a paragraph each, the opinion is stated in the introduction, developed in paragraph four and repeated in the conclusion. Linkers such as 'Nevertheless' and 'Moreover' are used sparingly.",
    },
    {
      title: "Learning languages at primary school",
      type: "Opinion",
      prompt: "Some people think that children should start learning a foreign language at primary school. To what extent do you agree or disagree?",
      text: `It is increasingly common for schools to introduce foreign languages to children as young as six. I strongly agree with this trend, because early learners acquire pronunciation more naturally and gain cognitive and cultural benefits that last a lifetime.

The most persuasive argument is biological. Young children absorb the sounds and rhythms of a new language far more easily than teenagers or adults, who often retain a noticeable accent however hard they study. A child who begins French at seven, for instance, is likely to speak it with near-native fluency by the time they leave school, whereas a student who starts at fifteen rarely achieves the same result.

Early language learning also strengthens other skills. Research suggests that bilingual children tend to concentrate better and switch between tasks more effectively, which helps them in subjects such as mathematics. Moreover, meeting another language broadens their outlook and makes them more tolerant of other cultures, a valuable quality in a globalised world.

Critics claim that primary schools should focus on reading, writing and arithmetic. However, language lessons can be short, playful and built around songs and games, so they need not take time from core subjects, and they can even reinforce a child's understanding of grammar in their own language.

In conclusion, the advantages of starting a foreign language early clearly outweigh the drawbacks, and schools should make it a normal part of the primary curriculum.`,
      notes: "A clear position from the first paragraph, two developed reasons with examples, and a counter-argument answered in paragraph four. The conclusion repeats the opinion in new words.",
    },
    {
      title: "Working from home",
      type: "Advantages and disadvantages",
      prompt: "More people now work from home. Do the advantages of this development outweigh the disadvantages?",
      text: `Remote working has become far more common in recent years, thanks to faster internet and changing attitudes among employers. In my opinion, the benefits of working from home outweigh the drawbacks, although the latter should not be ignored.

The main advantage is flexibility. Employees who no longer commute save hours each week, which they can spend with family, exercising or sleeping, and this usually leads to better wellbeing and higher productivity. Companies also benefit, since they can reduce spending on office space and recruit talented staff wherever they live rather than only in expensive cities.

On the other hand, there are genuine disadvantages. Some people find it difficult to separate work from home life, and end up working longer hours or feeling isolated without the daily contact of colleagues. Junior employees may also miss out on informal learning and mentoring, which happens naturally in a shared office but is hard to replicate through video calls.

Nevertheless, most of these problems can be managed. A hybrid arrangement, in which staff attend the office for two or three days a week, keeps social contact and teamwork while preserving flexibility. Employers can also arrange regular online meetings and clear working hours to protect employees' wellbeing.

In conclusion, working from home offers considerable advantages for both workers and employers, and with sensible policies its disadvantages can be largely overcome.`,
      notes: "The question asks whether advantages outweigh disadvantages, so the answer is given in the introduction and repeated at the end. Paragraph four shows balanced, realistic thinking rather than just listing points.",
    },
  ],
  lessons: [
    { title: "How to write an introduction", body: "Two sentences: paraphrase the topic, then state your opinion or outline what you will discuss. Do not copy the question and do not add background nobody asked for." },
    { title: "Building a strong body paragraph", body: "Topic sentence, explanation, example, then a short result or link back to the question. If a paragraph has no example, it is probably too thin." },
    { title: "Writing a conclusion", body: "Two sentences: restate your position with different words and summarise your main reasons. Never introduce a new idea here." },
    { title: "Giving your opinion clearly", body: "Use 'I strongly believe', 'In my view' or 'I would argue that', and keep the same position from start to finish. Contradicting yourself is a common cause of low Task Response scores." },
    { title: "Linking words that work", body: "Use contrast (however, whereas), addition (moreover, in addition), result (consequently) and example (for instance). Place them accurately and avoid starting every sentence with one." },
    { title: "Paragraphing", body: "One main idea per paragraph, not one long block and not five one-line paragraphs. A clean structure is the fastest gain for Coherence and Cohesion." },
    { title: "Planning in five minutes", body: "Write the question type, your position, two ideas with examples and a one-line conclusion. Then write straight from the plan without stopping." },
    { title: "Paraphrasing key words", body: "Learn synonyms for the words that appear in the question (people, children, government, problem). Repeating them makes your writing sound weak." },
    { title: "Common topics and vocabulary", body: "Education, technology, health, environment, crime, work, transport, media and family. Build a page of collocations for each and use them naturally." },
    { title: "Complex sentences", body: "Use relative clauses, 'although' and 'while' structures, conditionals and passives. Accuracy comes first, so keep at least half of your sentences error-free." },
    { title: "Avoiding memorised phrases", body: "Examiners can spot templates. Use your own natural wording and make sure every sentence answers the question that was asked." },
    { title: "Proofreading checklist", body: "Check articles (a, the), plurals, subject-verb agreement, tense, spelling and punctuation. Read the last paragraph first, since errors tend to pile up there." },
  ],
};
