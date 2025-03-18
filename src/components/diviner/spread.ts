import { z } from 'zod';

const SpreadStepSchema = z.object({
    name: z.string(),
    prompt: z.string()
})
export type SpreadStep = z.infer<typeof SpreadStepSchema>

export const SpreadSchema = z.enum(['Celtic Cross', 'Past Present Future',     'Five Card Cross', 'Love Reading'])
export type Spread = z.infer<typeof SpreadSchema>

export const SpreadSteps: Record<Spread, Array<SpreadStep>> = {
 "Past Present Future": [
        { name: "Past", prompt: "Past influences" },
        { name: "Present", prompt: "Current situation" },
        { name: "Future", prompt: "Future outlook" }
    ],

    "Celtic Cross": [
        { name: "Present", prompt: "The central issue or current situation" },
        { name: "Challenge", prompt: "The immediate challenge or opposing forces" },
        { name: "Subconscious", prompt: "Hidden influences or underlying emotions" },
        { name: "Past", prompt: "Recent events that led to current situation" },
        { name: "Future", prompt: "What's in store" },
        { name: "Near Future", prompt: "Upcoming events or immediate developments" },
        { name: "Internal Influences", prompt: "Your thoughts, feelings and attitude" },
        { name: "External Influences", prompt: "Environment and others' impact" },
        { name: "Hopes and Fears", prompt: "Your deeper desires and anxieties" },
        { name: "Outcome", prompt: "Final result" }
    ],

    "Five Card Cross": [
        { name: "Past", prompt: "Events and influences from the past" },
        { name: "Present", prompt: "Current situation and immediate concerns" },
        { name: "Future", prompt: "Where events are leading" },
        { name: "Core Reason", prompt: "Root cause or fundamental basis of circumstances" },
        { name: "Potential", prompt: "Hidden opportunities and possible outcomes" }
    ],

    "Love Reading": [
        { name: "Your Role", prompt: "Your energy, behavior, or perspective within the relationship" },
        { name: "Partner's Perspective", prompt: "How the other person views the relationship and their feelings toward you" },
        { name: "Strengths", prompt: "What's working well in your relationship" },
        { name: "Challenges", prompt: "Difficulties or areas of tension" },
        { name: "Future Potential", prompt: "Where the relationship is headed" }
    ]
}
