import { CardSchema } from './card';
import { SpreadSchema } from './spread';
import { z } from 'zod';

export const ReadingSchema = z.object({
    querent: z.string().nonempty(),
    reason: z.string().nonempty(),
    spread: SpreadSchema,
    reading: z.object({
        step: z.string(),
        card: CardSchema,
        clarifiers: CardSchema.array().nullish()
    }).array()
})

export type Reading = z.infer<typeof ReadingSchema>

export const sampleReading: Reading = {
  querent: "Alexandra Winters",
  reason: "Career Crossroads",
  spread: "Celtic Cross",
  reading: [
    {
      step: "Present",
      card: {
        cardCode: "M01",
        interpretation: "The Magician appearing here shows that you have all the tools you need to succeed in your current career situation. Your skills, talents, and expertise are ready to be channeled toward creating something meaningful. This is a time for action and manifestation."
      },
      clarifiers: null
    },
    {
      step: "Challenge",
      card: {
        cardCode: "S08",
        reversed: true,
        interpretation: "The Eight of Swords reversed indicates that you're beginning to break free from self-imposed limitations. Your challenge is to recognize the mental barriers you've created around your career. You may feel trapped, but the obstacles are largely illusory, and you have more options than you realize."
      },
      clarifiers: null
    },
    {
      step: "Subconscious",
      card: {
        cardCode: "P04",
        interpretation: "The Four of Pentacles reveals an underlying fear of financial insecurity that's influencing your decisions. In your subconscious, you're holding tightly to what you know and have already built, which may be preventing you from taking necessary risks for growth. Consider whether stability has become a comfortable prison."
      },
      clarifiers: null
    },
    {
      step: "Past",
      card: {
        cardCode: "W06",
        interpretation: "The Six of Wands shows past success and recognition that has built your confidence. You've proven yourself capable and received acknowledgment for your achievements. This foundation of success is important to remember as you navigate your current situation."
      },
      clarifiers: null
    },
    {
      step: "Future",
      card: {
        cardCode: "M17",
        interpretation: "The Star brings hope and inspiration to your career path. After a period of uncertainty, clarity is coming. This card promises renewal and creative inspiration that will guide you toward your true purpose. New opportunities aligned with your authentic self will emerge."
      },
      clarifiers: [
        {
          cardCode: "C02",
          interpretation: "The Two of Cups as a clarifier suggests that a meaningful partnership or collaboration will play a significant role in your future career direction. Look for opportunities to combine your talents with someone whose strengths complement yours."
        }
      ]
    },
    {
      step: "Near Future",
      card: {
        cardCode: "W08",
        interpretation: "The Eight of Wands indicates rapid developments and forward movement in the coming weeks. Communications will accelerate and opportunities may arrive suddenly. Be prepared for quick decisions and faster progress than you've experienced recently."
      },
      clarifiers: null
    },
    {
      step: "Internal Influences",
      card: {
        cardCode: "M09",
        interpretation: "The Hermit represents your inner wisdom and need for contemplation. You're in a phase of deep reflection about your true calling. Trust this process of looking inward—the answers you seek about your career path are already within you, waiting to be illuminated."
      },
      clarifiers: null
    },
    {
      step: "External Influences",
      card: {
        cardCode: "W03",
        interpretation: "The Three of Wands shows external opportunities for expansion and growth. Others see potential in you that you may not fully recognize. The broader professional landscape is favorable for taking your skills to new territories or markets. Look outward for possibilities to expand your horizons."
      },
      clarifiers: null
    },
    {
      step: "Hopes and Fears",
      card: {
        cardCode: "P03",
        interpretation: "The Three of Pentacles represents your hope for collaboration, recognition of your craftsmanship, and sustainable success. You desire work that allows you to demonstrate your skills while working effectively with others. However, you may fear that your abilities won't be valued appropriately in new environments."
      },
      clarifiers: null
    },
    {
      step: "Outcome",
      card: {
        cardCode: "M21",
        interpretation: "The World appears as your outcome, promising a successful conclusion to this career chapter and the beginning of a new, more fulfilling cycle. This major arcana card indicates completion, achievement, and integration of all you've learned. Your career transition will ultimately lead to a sense of wholeness and accomplishment."
      },
      clarifiers: [
        {
          cardCode: "W11",
          interpretation: "The Page of Wands as a clarifier suggests that your new beginning will involve fresh enthusiasm and creative opportunities. An aspect of apprenticeship or learning may be present, even if you're experienced in your field. Approach your new path with the eagerness and openness of a beginner."
        },
        {
          cardCode: "C10",
          interpretation: "The Ten of Cups adds emotional fulfillment to your career outcome. The path forward will not only bring professional satisfaction but also create harmony between your work life and personal happiness. This suggests that your career decisions will positively impact your overall well-being and relationships."
        }
      ]
    }
  ]
};
