import { WorkoutPlan } from './types';

export const DEFAULT_PLANS: WorkoutPlan[] = [
  {
    "planId": "phase-1-foundation",
    "title": "Phase 1: Foundation Build",
    "targetAudience": "Beginner restart, 30 min early morning indoors",
    "primaryGoals": [
      "Better sex stamina + hip endurance",
      "Stronger shoulders / arms",
      "Easier carrying son",
      "Belly fat reduction",
      "Allergy-friendly conditioning"
    ],
    "globalRules": {
      "intensity": "6-7/10 effort. Finish energized, not wrecked.",
      "breathing": "Never hold breath. Exhale (mouth) on hard part, Inhale (nose) on easy part.",
      "rest": "Pause 15-30 sec anytime if needed.",
      "tempo": "Move controlled. No sloppy reps."
    },
    "progression": {
      "week1": "Learn movements.",
      "week2": "Add +2 reps where easy.",
      "week3": "Add 1 extra round Monday/Wednesday/Friday.",
      "week4": "Reduce rests by 10 sec."
    },
    "schedule": [
      {
        "day": 1,
        "dayName": "Monday",
        "focus": "Upper body + core",
        "blocks": [
          {
            "blockName": "Warm-Up",
            "rounds": 1,
            "exercises": [
              { "name": "March in place", "type": "time", "value": 60, "unit": "sec" },
              { "name": "Arm circles forward", "type": "reps", "value": 10, "unit": "reps" },
              { "name": "Arm circles backward", "type": "reps", "value": 10, "unit": "reps" },
              { "name": "Shoulder blade squeezes", "type": "reps", "value": 10, "unit": "reps" },
              { "name": "Cat-camel", "type": "reps", "value": 10, "unit": "reps" },
              { "name": "Glute bridges", "type": "reps", "value": 10, "unit": "reps" }
            ]
          },
          {
            "blockName": "Main Circuit",
            "rounds": 3,
            "exercises": [
              { "name": "Incline Push-Up", "type": "reps", "value": 8, "unit": "reps", "instructions": "Hands on bench. Body straight from head to heel. Lower chest toward bench.", "focus": "Chest, triceps, core", "breathing": "Inhale down, exhale push up." },
              { "name": "Bear Hold", "type": "time", "value": 20, "unit": "sec", "instructions": "Hands under shoulders, knees hover just above floor.", "focus": "Abs tight, shoulders stable." },
              { "name": "Glute Bridge", "type": "reps", "value": 15, "unit": "reps", "instructions": "Lie on back, feet planted, squeeze butt and lift hips. Pause 1 sec top." },
              { "name": "Rest", "type": "rest", "value": 30, "unit": "sec" }
            ]
          },
          {
            "blockName": "Finisher",
            "rounds": 5,
            "exercises": [
              { "name": "Forearm Plank", "type": "time", "value": 20, "unit": "sec" },
              { "name": "Rest", "type": "rest", "value": 10, "unit": "sec" }
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
              { "name": "Easy march", "type": "time", "value": 60, "unit": "sec" },
              { "name": "Arm swings", "type": "time", "value": 30, "unit": "sec" },
              { "name": "Hip circles", "type": "time", "value": 30, "unit": "sec" }
            ]
          },
          {
            "blockName": "Intervals",
            "rounds": 10,
            "exercises": [
              { "name": "Work (Rotate: Fast march, Slow climbers, Shadow boxing, Step-ups)", "type": "time", "value": 40, "unit": "sec", "instructions": "Breathing hard but controlled." },
              { "name": "Easy Walk / Rest", "type": "rest", "value": 20, "unit": "sec" }
            ]
          },
          {
            "blockName": "Recovery",
            "rounds": 1,
            "exercises": [
              { "name": "Slow nasal breathing", "type": "time", "value": 300, "unit": "sec", "instructions": "4 sec inhale, 6 sec exhale" }
            ]
          }
        ]
      },
      {
        "day": 3,
        "dayName": "Wednesday",
        "focus": "Hips + Legs",
        "blocks": [
          {
            "blockName": "Warm-Up",
            "rounds": 1,
            "exercises": [
              { "name": "Glute bridges", "type": "reps", "value": 10, "unit": "reps" },
              { "name": "Bodyweight squats", "type": "reps", "value": 10, "unit": "reps" },
              { "name": "Hip circles", "type": "time", "value": 30, "unit": "sec" }
            ]
          },
          {
            "blockName": "Main Circuit",
            "rounds": 3,
            "exercises": [
              { "name": "Bodyweight Squat", "type": "reps", "value": 12, "unit": "reps", "instructions": "Sit hips back and down. Heels flat, chest tall." },
              { "name": "Reverse Lunge", "type": "reps", "value": 8, "unit": "reps", "instructions": "Step back, lower under control. Use wall support if needed. 8 per leg." },
              { "name": "Frog Pump", "type": "reps", "value": 20, "unit": "reps", "instructions": "Lie down, soles of feet together, knees apart. Lift hips." },
              { "name": "Rest", "type": "rest", "value": 30, "unit": "sec" }
            ]
          },
          {
            "blockName": "Finisher",
            "rounds": 3,
            "exercises": [
              { "name": "Bridge Hold", "type": "time", "value": 30, "unit": "sec" },
              { "name": "Rest", "type": "rest", "value": 15, "unit": "sec" }
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
              { "name": "Deep squat hold", "type": "time", "value": 30, "unit": "sec" },
              { "name": "Hip flexor stretch", "type": "time", "value": 30, "unit": "sec", "instructions": "Each side" },
              { "name": "Hamstring stretch", "type": "time", "value": 30, "unit": "sec", "instructions": "Each side" },
              { "name": "Thoracic open book", "type": "reps", "value": 10, "unit": "reps", "instructions": "Each side" },
              { "name": "Dead bug", "type": "reps", "value": 10, "unit": "reps", "instructions": "Total reps" },
              { "name": "Easy walk around room", "type": "time", "value": 300, "unit": "sec" }
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
              { "name": "March in place", "type": "time", "value": 60, "unit": "sec" },
              { "name": "Glute bridges", "type": "reps", "value": 10, "unit": "reps" },
              { "name": "Shoulder taps", "type": "reps", "value": 10, "unit": "reps" }
            ]
          },
          {
            "blockName": "Circuit",
            "rounds": 4,
            "exercises": [
              { "name": "Push-Up Top Hold", "type": "time", "value": 20, "unit": "sec", "instructions": "Straight arms plank position." },
              { "name": "Fast Glute Bridges", "type": "reps", "value": 20, "unit": "reps", "instructions": "Drive hips fast." },
              { "name": "Mountain Climbers", "type": "time", "value": 20, "unit": "sec" },
              { "name": "Rest", "type": "rest", "value": 30, "unit": "sec" }
            ]
          },
          {
            "blockName": "Core Finish",
            "rounds": 2,
            "exercises": [
              { "name": "Side plank left", "type": "time", "value": 20, "unit": "sec" },
              { "name": "Side plank right", "type": "time", "value": 20, "unit": "sec" }
            ]
          }
        ]
      },
      {
        "day": 6,
        "dayName": "Saturday",
        "focus": "Active Recovery (Optional)",
        "blocks": [
          {
            "blockName": "Activity",
            "rounds": 1,
            "exercises": [
              { "name": "Walk / Play actively / Park stairs", "type": "time", "value": 1800, "unit": "sec" }
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
      "longerSessions": "Tuesday intervals",
      "betterControl": "Dead bug + side plank",
      "lessExhaustion": "Breathing drills + conditioning",
      "carryingSon": "Squats, Lunges, Planks, Pushups, Bridges"
    }
  }
];
