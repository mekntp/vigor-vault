import { WorkoutPlan } from './types';

export const DEFAULT_PLANS: WorkoutPlan[] = [
  {
    "planId": "phase-1-optimized",
    "title": "Phase 1: Foundation Build (Optimized)",
    "targetAudience": "Beginner restart, 30 min early morning indoors",
    "primaryGoals": [
      "Better sex stamina + hip endurance",
      "Stronger shoulders / arms",
      "Easier carrying son",
      "Belly fat reduction",
      "Allergy-friendly conditioning",
      "Improve posture and pulling strength"
    ],
    "globalRules": {
      "intensity": "6-7/10 effort. Finish energized, not wrecked.",
      "breathing": "Never hold breath. Exhale (mouth) on hard part, Inhale (nose) on easy part.",
      "rest": "Pause 15-30 sec anytime if needed.",
      "tempo": "Move controlled. No sloppy reps."
    },
    "progression": {
      "week1": "Learn movements and pacing.",
      "week2": "Add +2 reps where easy or +5 sec holds.",
      "week3": "Add 1 extra round Monday/Wednesday/Friday.",
      "week4": "Reduce rests by 10 sec."
    },
    "schedule": [
      {
        "day": 1,
        "dayName": "Monday",
        "focus": "Upper body + core + pulling",
        "blocks": [
          {
            "blockName": "Warm-Up",
            "rounds": 1,
            "exercises": [
              {
                "name": "March in place",
                "type": "time",
                "value": 60,
                "unit": "sec",
                "instructions": "Breathe through nose to filter air."
              },
              {
                "name": "Arm circles forward",
                "type": "reps",
                "value": 10,
                "unit": "reps",
                "instructions": "Slow and controlled."
              },
              {
                "name": "Arm circles backward",
                "type": "reps",
                "value": 10,
                "unit": "reps",
                "instructions": "Slow and controlled."
              },
              {
                "name": "Shoulder blade squeezes",
                "type": "reps",
                "value": 12,
                "unit": "reps",
                "instructions": "Pinch shoulder blades together."
              },
              {
                "name": "Cat-camel",
                "type": "reps",
                "value": 10,
                "unit": "reps",
                "instructions": "Slow and controlled for back mobility."
              },
              {
                "name": "Glute bridges",
                "type": "reps",
                "value": 10,
                "unit": "reps",
                "instructions": "Squeeze glutes at the top."
              }
            ]
          },
          {
            "blockName": "Main Circuit",
            "rounds": 3,
            "exercises": [
              {
                "name": "Incline Push-Up",
                "type": "reps",
                "value": 8,
                "unit": "reps",
                "instructions": "Hands on bench. Keep body straight from head to heels. Gaze 15cm ahead. Exhale sharply pushing up.",
                "focus": "Chest, triceps, core",
                "breathing": "Inhale down, exhale push up."
              },
              {
                "name": "Standing Band / Cord Row",
                "type": "reps",
                "value": 15,
                "unit": "reps",
                "instructions": "Pull elbows back, squeeze shoulder blades together. Maintain slow tempo."
              },
              {
                "name": "Bear Hold",
                "type": "time",
                "value": 20,
                "unit": "sec",
                "instructions": "Hands under shoulders, knees hover just above floor. Keep abs tight and shoulders stable."
              },
              {
                "name": "Rest",
                "type": "rest",
                "value": 30,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Finisher",
            "rounds": 5,
            "exercises": [
              {
                "name": "Forearm Plank",
                "type": "time",
                "value": 20,
                "unit": "sec",
                "instructions": "Body straight, core braced. Don't let lower back sag."
              },
              {
                "name": "Rest",
                "type": "rest",
                "value": 10,
                "unit": "sec"
              }
            ]
          }
        ]
      },
      {
        "day": 2,
        "dayName": "Tuesday",
        "focus": "Silent Cardio Stamina",
        "blocks": [
          {
            "blockName": "Warm-Up",
            "rounds": 1,
            "exercises": [
              {
                "name": "Easy march",
                "type": "time",
                "value": 60,
                "unit": "sec"
              },
              {
                "name": "Arm swings",
                "type": "time",
                "value": 30,
                "unit": "sec"
              },
              {
                "name": "Hip circles",
                "type": "time",
                "value": 30,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Intervals",
            "rounds": 10,
            "exercises": [
              {
                "name": "Work (Rotate: Fast march, Slow climbers, Shadow boxing, Step-ups)",
                "type": "time",
                "value": 30,
                "unit": "sec",
                "instructions": "Silent cardio. Keep breathing hard but controlled. Don't rush."
              },
              {
                "name": "Easy Walk / Rest",
                "type": "rest",
                "value": 30,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Recovery",
            "rounds": 1,
            "exercises": [
              {
                "name": "Slow nasal breathing",
                "type": "time",
                "value": 300,
                "unit": "sec",
                "instructions": "4 sec inhale (nose), 6 sec exhale (mouth). Filter and humidify air."
              }
            ]
          }
        ]
      },
      {
        "day": 3,
        "dayName": "Wednesday",
        "focus": "Hips + Legs + Shoulders",
        "blocks": [
          {
            "blockName": "Warm-Up",
            "rounds": 1,
            "exercises": [
              {
                "name": "Glute bridges",
                "type": "reps",
                "value": 10,
                "unit": "reps"
              },
              {
                "name": "Bodyweight squats",
                "type": "reps",
                "value": 10,
                "unit": "reps"
              },
              {
                "name": "Hip circles",
                "type": "time",
                "value": 30,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Main Circuit",
            "rounds": 3,
            "exercises": [
              {
                "name": "Bodyweight Squat",
                "type": "reps",
                "value": 12,
                "unit": "reps",
                "instructions": "Sit hips back and down. Heels flat, chest tall."
              },
              {
                "name": "Reverse Lunge",
                "type": "reps",
                "value": 8,
                "unit": "reps",
                "instructions": "Step back long enough so front knee doesn't jam forward. Lower under control. 8 per leg."
              },
              {
                "name": "Frog Pump",
                "type": "reps",
                "value": 20,
                "unit": "reps",
                "instructions": "Lie down, soles of feet together, knees apart. Lift hips."
              },
              {
                "name": "Rest",
                "type": "rest",
                "value": 30,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Shoulder Builder",
            "rounds": 2,
            "exercises": [
              {
                "name": "Band Shoulder Press",
                "type": "reps",
                "value": 12,
                "unit": "reps",
                "instructions": "Stand on bands, push up. Use controlled tempo to target weak shoulders."
              },
              {
                "name": "Rest",
                "type": "rest",
                "value": 20,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Finisher",
            "rounds": 3,
            "exercises": [
              {
                "name": "Bridge Hold",
                "type": "time",
                "value": 30,
                "unit": "sec",
                "instructions": "Fully lock hips at top with glutes, not lower back."
              },
              {
                "name": "Rest",
                "type": "rest",
                "value": 15,
                "unit": "sec"
              }
            ]
          }
        ]
      },
      {
        "day": 4,
        "dayName": "Thursday",
        "focus": "Recovery + Mobility",
        "blocks": [
          {
            "blockName": "30-Min Flow",
            "rounds": 1,
            "exercises": [
              {
                "name": "Deep squat hold",
                "type": "time",
                "value": 30,
                "unit": "sec",
                "instructions": "Deep heel-flat squat. Improves hip mobility."
              },
              {
                "name": "Hip flexor stretch",
                "type": "time",
                "value": 30,
                "unit": "sec",
                "instructions": "Each side."
              },
              {
                "name": "Hamstring stretch",
                "type": "time",
                "value": 30,
                "unit": "sec",
                "instructions": "Each side."
              },
              {
                "name": "Thoracic open book",
                "type": "reps",
                "value": 10,
                "unit": "reps",
                "instructions": "Each side."
              },
              {
                "name": "Dead bug",
                "type": "reps",
                "value": 10,
                "unit": "reps",
                "instructions": "Total reps. Keep lower back pressed to floor."
              },
              {
                "name": "Easy walk around room",
                "type": "time",
                "value": 300,
                "unit": "sec"
              },
              {
                "name": "Breathing Reset",
                "type": "time",
                "value": 180,
                "unit": "sec",
                "instructions": "4 sec inhale (nose), 6 sec exhale (mouth). Relax and recover."
              }
            ]
          }
        ]
      },
      {
        "day": 5,
        "dayName": "Friday",
        "focus": "Full Performance Circuit",
        "blocks": [
          {
            "blockName": "Warm-Up",
            "rounds": 1,
            "exercises": [
              {
                "name": "March in place",
                "type": "time",
                "value": 60,
                "unit": "sec"
              },
              {
                "name": "Glute bridges",
                "type": "reps",
                "value": 10,
                "unit": "reps"
              },
              {
                "name": "Shoulder taps",
                "type": "reps",
                "value": 10,
                "unit": "reps"
              }
            ]
          },
          {
            "blockName": "Circuit",
            "rounds": 4,
            "exercises": [
              {
                "name": "Push-Up Top Hold",
                "type": "time",
                "value": 20,
                "unit": "sec",
                "instructions": "Straight arms plank position. Focus on building tricep endurance."
              },
              {
                "name": "Fast Glute Bridges",
                "type": "reps",
                "value": 20,
                "unit": "reps",
                "instructions": "Drive hips fast. Fully lock hips at top with glutes."
              },
              {
                "name": "Mountain Climbers",
                "type": "time",
                "value": 20,
                "unit": "sec",
                "instructions": "Keep head still, neck neutral. Silent cardio. Keep core tight, don't rush."
              },
              {
                "name": "Standing Band / Cord Row",
                "type": "reps",
                "value": 15,
                "unit": "reps",
                "instructions": "Pull elbows back, squeeze shoulder blades together."
              },
              {
                "name": "Rest",
                "type": "rest",
                "value": 30,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Core Finish",
            "rounds": 2,
            "exercises": [
              {
                "name": "Side plank left",
                "type": "time",
                "value": 20,
                "unit": "sec"
              },
              {
                "name": "Side plank right",
                "type": "time",
                "value": 20,
                "unit": "sec"
              }
            ]
          }
        ]
      },
      {
        "day": 6,
        "dayName": "Saturday",
        "focus": "Active Recovery + Carry Strength",
        "blocks": [
          {
            "blockName": "Carry Work",
            "rounds": 3,
            "exercises": [
              {
                "name": "Suitcase Carry Left",
                "type": "time",
                "value": 30,
                "unit": "sec",
                "instructions": "Hold heavy object on left side. Keep shoulders level and stable like carrying your son. Walk room."
              },
              {
                "name": "Suitcase Carry Right",
                "type": "time",
                "value": 30,
                "unit": "sec",
                "instructions": "Hold heavy object on right side. Keep shoulders level and stable. Walk room."
              },
              {
                "name": "Rest",
                "type": "rest",
                "value": 20,
                "unit": "sec"
              }
            ]
          },
          {
            "blockName": "Activity",
            "rounds": 1,
            "exercises": [
              {
                "name": "Walk / Play actively / Park stairs",
                "type": "time",
                "value": 900,
                "unit": "sec"
              }
            ]
          }
        ]
      },
      {
        "day": 7,
        "dayName": "Sunday",
        "focus": "Full Rest",
        "blocks": []
      }
    ],
    "transferBenefits": {
      "topPosition": "Pushups + holds + planks",
      "strongerThrusting": "Bridges + frog pumps + lunges",
      "longerSessions": "Intervals and recovery breathing",
      "betterControl": "Dead bug + side plank",
      "lessExhaustion": "Cardio base + breathing drills",
      "carryingSon": "Squats, Lunges, Rows, Carries, Pushups"
    },
    "id": "phase-1-optimized",
    "createdAt": 1776702000000,
    "updatedAt": 1776702000000
  }
];
