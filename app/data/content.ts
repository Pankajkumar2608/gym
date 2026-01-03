import { Exercise, Program } from './types';

export const EXERCISES: Record<string, Exercise> = {
  // CHEST EXERCISES
  'bench_press': {
    id: 'bench_press',
    name: 'Barbell Bench Press',
    muscleGroup: ['Chest', 'Shoulders', 'Arms'],
    description: 'The king of upper body exercises. Targets the pectorals, deltoids, and triceps.',
    steps: [
      'Lie back on a flat bench. Using a medium width grip, lift the bar from the rack and hold it straight over you with your arms locked.',
      'From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.',
      'After a brief pause, push the bar back to the starting position as you breathe out.',
      'Lock your arms and squeeze your chest in the contracted position at the top.'
    ],
    tips: ['Keep your feet flat on the ground.', 'Do not bounce the bar off your chest.', 'Keep your elbows at a 45-degree angle.'],
    defaultSets: 4,
    defaultReps: '8-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4',
    //thumbnail: 'https://media.giphy.com/media/3o7aCQZKzZKzZKzZKzZ/giphy.gif'
  },
  'incline_db_press': {
    id: 'incline_db_press',
    name: 'Incline Dumbbell Press',
    muscleGroup: ['Chest', 'Shoulders'],
    description: 'Targets the upper chest and shoulders for a complete chest development.',
    steps: [
      'Lie back on an incline bench with a dumbbell in each hand atop your thighs.',
      'Lift the weights to your shoulders, then push them up until your arms are locked out.',
      'Lower the weights slowly to your sides, keeping elbows slightly tucked.',
      'Press back up to the starting position.'
    ],
    tips: ['Focus on the stretch at the bottom.', 'Don\'t bang the dumbbells together at the top.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-incline-bench-press-front.mp4'
  },
  'cable_flies': {
    id: 'cable_flies',
    name: 'Cable Flies',
    muscleGroup: ['Chest'],
    description: 'Isolation exercise for chest with constant tension throughout the movement.',
    steps: [
      'Set pulleys at chest height and grab handles.',
      'Step forward with one foot, keeping a slight bend in elbows.',
      'Bring handles together in front of chest in a hugging motion.',
      'Slowly return to starting position with control.'
    ],
    tips: ['Keep slight bend in elbows.', 'Focus on squeezing chest at peak contraction.'],
    defaultSets: 3,
    defaultReps: '12-15',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-cable-standing-fly-front.mp4'
  },
  'dips': {
    id: 'dips',
    name: 'Chest Dips',
    muscleGroup: ['Chest', 'Arms'],
    description: 'Compound bodyweight exercise targeting lower chest and triceps.',
    steps: [
      'Grab parallel bars and lift yourself up.',
      'Lean forward slightly to emphasize chest.',
      'Lower your body until upper arms are parallel to ground.',
      'Push back up to starting position.'
    ],
    tips: ['Lean forward for more chest activation.', 'Don\'t lock out elbows at top.'],
    defaultSets: 3,
    defaultReps: '8-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-chest-dip-front.mp4'
  },
  'push_ups': {
    id: 'push_ups',
    name: 'Push-Ups',
    muscleGroup: ['Chest', 'Arms', 'Core'],
    description: 'Classic bodyweight exercise for chest, shoulders, and triceps.',
    steps: [
      'Get into plank position with hands slightly wider than shoulder-width.',
      'Lower your body until chest nearly touches the floor.',
      'Push back up to starting position.',
      'Keep core tight throughout the movement.'
    ],
    tips: ['Keep body in straight line.', 'Don\'t let hips sag or pike up.'],
    defaultSets: 3,
    defaultReps: '15-20',
    gif: "https://media.musclewiki.com/media/uploads/videos/branded/male-Bodyweight-push-up-front.mp4"
  },

  // BACK EXERCISES
  'pull_ups': {
    id: 'pull_ups',
    name: 'Pull-Ups',
    muscleGroup: ['Back', 'Arms'],
    description: 'A classic bodyweight exercise for back width and bicep development.',
    steps: [
      'Grab the pull-up bar with palms facing forward, grip wider than shoulder width.',
      'Pull your torso up until your chin is over the bar.',
      'Lower yourself until your arms are fully extended.'
    ],
    tips: ['Avoid swinging.', 'Focus on pulling with your elbows.'],
    defaultSets: 3,
    defaultReps: 'AMRAP',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-pull-up-front.mp4'
  },
  'deadlift': {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    muscleGroup: ['Back', 'Legs', 'Core'],
    description: 'The ultimate full body power movement for strength and mass.',
    steps: [
      'Stand with feet hip-width apart, barbell over mid-foot.',
      'Hinge at hips to grab the bar just outside your legs.',
      'Bend knees until shins touch bar. Chest up, back straight.',
      'Pull the weight by driving hips forward and standing up tall.'
    ],
    tips: ['Keep back neutral.', 'Bar should travel close to legs.'],
    defaultSets: 4,
    defaultReps: '5',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-deadlift-front.mp4'
  },
  'barbell_rows': {
    id: 'barbell_rows',
    name: 'Barbell Bent-Over Rows',
    muscleGroup: ['Back', 'Arms'],
    description: 'Compound movement for back thickness and bicep development.',
    steps: [
      'Hold barbell with overhand grip, bend at hips until torso is nearly parallel to floor.',
      'Pull the bar to your lower chest/upper abs.',
      'Squeeze shoulder blades together at the top.',
      'Lower bar with control back to starting position.'
    ],
    tips: ['Keep lower back flat.', 'Pull with elbows, not hands.'],
    defaultSets: 4,
    defaultReps: '8-10',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bent-over-row-front.mp4'
  },
  'lat_pulldown': {
    id: 'lat_pulldown',
    name: 'Lat Pulldown',
    muscleGroup: ['Back', 'Arms'],
    description: 'Machine exercise targeting the latissimus dorsi for back width.',
    steps: [
      'Sit at lat pulldown station and grab bar with wide overhand grip.',
      'Pull bar down to upper chest while squeezing lats.',
      'Slowly return bar to starting position with control.'
    ],
    tips: ['Don\'t lean back excessively.', 'Focus on using lats, not arms.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-cable-lat-pulldown-front.mp4'
  },
  'seated_cable_row': {
    id: 'seated_cable_row',
    name: 'Seated Cable Row',
    muscleGroup: ['Back'],
    description: 'Excellent for building back thickness and improving posture.',
    steps: [
      'Sit at cable row station with feet on platform, knees slightly bent.',
      'Grab handles and pull towards your torso, squeezing shoulder blades.',
      'Extend arms slowly back to starting position.'
    ],
    tips: ['Keep torso stationary.', 'Squeeze at peak contraction.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-cable-seated-row-front.mp4'
  },
  'face_pulls': {
    id: 'face_pulls',
    name: 'Face Pulls',
    muscleGroup: ['Back', 'Shoulders'],
    description: 'Great for rear delts and upper back, improves shoulder health.',
    steps: [
      'Set cable at head height with rope attachment.',
      'Pull rope towards face, separating hands as you pull.',
      'Squeeze upper back and rear delts at contraction.',
      'Return to starting position with control.'
    ],
    tips: ['Keep elbows high.', 'External rotate at the end of movement.'],
    defaultSets: 3,
    defaultReps: '15-20',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-cable-face-pull-front.mp4'
  },

  // LEG EXERCISES
  'squat': {
    id: 'squat',
    name: 'Barbell Squat',
    muscleGroup: ['Legs', 'Core'],
    description: 'The king of leg exercises. Builds overall leg strength and mass.',
    steps: [
      'Rest the bar on your upper back (traps).',
      'Step back, feet shoulder-width apart, toes slightly out.',
      'Squat down by pushing your hips back and bending your knees.',
      'Go as deep as flexibility allows, then drive back up.'
    ],
    tips: ['Keep your chest up.', 'Drive through your heels.', 'Keep knees pushed out.'],
    defaultSets: 4,
    defaultReps: '6-8',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-squat-front.mp4'
  },
  'leg_press': {
    id: 'leg_press',
    name: 'Leg Press',
    muscleGroup: ['Legs'],
    description: 'Machine exercise for building leg mass with controlled movement.',
    steps: [
      'Sit on leg press machine with feet shoulder-width apart on platform.',
      'Lower the weight by bending knees towards chest.',
      'Push through feet to extend legs without locking knees.'
    ],
    tips: ['Don\'t let lower back round.', 'Don\'t lock out knees at top.'],
    defaultSets: 4,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-machine-leg-press-front.mp4'
  },
  'lunges': {
    id: 'lunges',
    name: 'Walking Lunges',
    muscleGroup: ['Legs', 'Core'],
    description: 'Unilateral exercise for leg strength and balance.',
    steps: [
      'Stand upright holding dumbbells at sides.',
      'Step forward and lower hips until both knees are at 90 degrees.',
      'Push through front heel to step forward into next lunge.'
    ],
    tips: ['Keep torso upright.', 'Don\'t let front knee pass toes.'],
    defaultSets: 3,
    defaultReps: '12 each leg',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-lunge-front.mp4'
  },
  'leg_curl': {
    id: 'leg_curl',
    name: 'Lying Leg Curl',
    muscleGroup: ['Legs'],
    description: 'Isolation exercise targeting the hamstrings.',
    steps: [
      'Lie face down on leg curl machine with pad behind ankles.',
      'Curl weight up by bending knees.',
      'Squeeze hamstrings at top, then lower with control.'
    ],
    tips: ['Don\'t lift hips off pad.', 'Control the negative.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-machine-lying-leg-curl-side.mp4'
  },
  'leg_extension': {
    id: 'leg_extension',
    name: 'Leg Extension',
    muscleGroup: ['Legs'],
    description: 'Isolation exercise for quadriceps development.',
    steps: [
      'Sit on leg extension machine with pad on front of ankles.',
      'Extend legs until straight.',
      'Squeeze quads at top, then lower with control.'
    ],
    tips: ['Don\'t use momentum.', 'Pause at top contraction.'],
    defaultSets: 3,
    defaultReps: '12-15',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-machine-leg-extension-side.mp4'
  },
  'calf_raises': {
    id: 'calf_raises',
    name: 'Standing Calf Raises',
    muscleGroup: ['Legs'],
    description: 'Isolation exercise for calf muscle development.',
    steps: [
      'Stand on calf raise machine with shoulders under pads.',
      'Rise up on toes as high as possible.',
      'Lower heels below platform level for full stretch.'
    ],
    tips: ['Full range of motion.', 'Pause at top and bottom.'],
    defaultSets: 4,
    defaultReps: '15-20',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-machine-standing-calf-raise-side.mp4'
  },
  'romanian_deadlift': {
    id: 'romanian_deadlift',
    name: 'Romanian Deadlift',
    muscleGroup: ['Legs', 'Back'],
    description: 'Hip hinge movement targeting hamstrings and glutes.',
    steps: [
      'Hold barbell with overhand grip at hip level.',
      'Push hips back while lowering bar along legs.',
      'Feel stretch in hamstrings, then drive hips forward to stand.'
    ],
    tips: ['Keep bar close to legs.', 'Slight bend in knees.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-romanian-deadlift-front.mp4'
  },

  // SHOULDER EXERCISES
  'overhead_press': {
    id: 'overhead_press',
    name: 'Overhead Press',
    muscleGroup: ['Shoulders', 'Arms'],
    description: 'Compound pressing movement for shoulder strength and mass.',
    steps: [
      'Hold barbell at shoulder level with grip just outside shoulders.',
      'Press bar straight overhead until arms are locked.',
      'Lower bar back to shoulders with control.'
    ],
    tips: ['Keep core tight.', 'Don\'t lean back excessively.'],
    defaultSets: 4,
    defaultReps: '6-8',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-overhead-press-front.mp4'
  },
  'lateral_raises': {
    id: 'lateral_raises',
    name: 'Dumbbell Lateral Raises',
    muscleGroup: ['Shoulders'],
    description: 'Isolation exercise for medial deltoid development.',
    steps: [
      'Stand with dumbbells at sides, slight bend in elbows.',
      'Raise arms out to sides until parallel with floor.',
      'Lower with control back to starting position.'
    ],
    tips: ['Lead with elbows.', 'Don\'t swing the weights.'],
    defaultSets: 3,
    defaultReps: '12-15',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-lateral-raise-front.mp4'
  },
  'front_raises': {
    id: 'front_raises',
    name: 'Dumbbell Front Raises',
    muscleGroup: ['Shoulders'],
    description: 'Isolation exercise targeting the front deltoids.',
    steps: [
      'Stand with dumbbells in front of thighs.',
      'Raise one or both arms forward to shoulder height.',
      'Lower with control and repeat.'
    ],
    tips: ['Keep slight bend in elbows.', 'Don\'t swing or use momentum.'],
    defaultSets: 3,
    defaultReps: '12-15',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-front-raise-front.mp4'
  },
  'rear_delt_flies': {
    id: 'rear_delt_flies',
    name: 'Rear Delt Flies',
    muscleGroup: ['Shoulders', 'Back'],
    description: 'Isolation exercise for rear deltoid development.',
    steps: [
      'Bend at hips with dumbbells hanging below chest.',
      'Raise arms out to sides, squeezing rear delts.',
      'Lower with control back to starting position.'
    ],
    tips: ['Keep torso stable.', 'Squeeze shoulder blades together.'],
    defaultSets: 3,
    defaultReps: '15-20',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-rear-delt-fly-front.mp4'
  },
  'arnold_press': {
    id: 'arnold_press',
    name: 'Arnold Press',
    muscleGroup: ['Shoulders', 'Arms'],
    description: 'Rotational pressing movement hitting all three deltoid heads.',
    steps: [
      'Start with dumbbells at shoulder level, palms facing you.',
      'Press up while rotating palms to face forward.',
      'Reverse the motion back to starting position.'
    ],
    tips: ['Control the rotation.', 'Full range of motion.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-arnold-press-front.mp4'
  },

  // ARM EXERCISES
  'bicep_curls': {
    id: 'bicep_curls',
    name: 'Barbell Bicep Curls',
    muscleGroup: ['Arms'],
    description: 'Classic isolation exercise for bicep development.',
    steps: [
      'Stand with barbell at arm\'s length, palms forward.',
      'Curl bar up towards shoulders, keeping elbows stationary.',
      'Squeeze biceps at top, then lower with control.'
    ],
    tips: ['Don\'t swing body.', 'Keep elbows pinned to sides.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-curl-front.mp4'
  },
  'hammer_curls': {
    id: 'hammer_curls',
    name: 'Hammer Curls',
    muscleGroup: ['Arms'],
    description: 'Targets brachialis and forearms along with biceps.',
    steps: [
      'Hold dumbbells at sides with palms facing each other.',
      'Curl weights up while keeping palms facing inward.',
      'Lower with control back to starting position.'
    ],
    tips: ['Keep elbows stationary.', 'Don\'t use momentum.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-hammer-curl-front.mp4'
  },
  'tricep_pushdown': {
    id: 'tricep_pushdown',
    name: 'Cable Tricep Pushdown',
    muscleGroup: ['Arms'],
    description: 'Isolation exercise targeting all three tricep heads.',
    steps: [
      'Stand at cable machine with rope or bar attachment.',
      'Push weight down by extending elbows.',
      'Squeeze triceps at bottom, then return with control.'
    ],
    tips: ['Keep elbows pinned to sides.', 'Don\'t lean forward.'],
    defaultSets: 3,
    defaultReps: '12-15',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-cable-pushdown-front.mp4'
  },
  'skull_crushers': {
    id: 'skull_crushers',
    name: 'Skull Crushers',
    muscleGroup: ['Arms'],
    description: 'Lying tricep extension for mass building.',
    steps: [
      'Lie on bench holding EZ bar or dumbbells above chest.',
      'Lower weight towards forehead by bending elbows.',
      'Extend arms back to starting position.'
    ],
    tips: ['Keep upper arms stationary.', 'Control the weight.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-skullcrusher-side.mp4'
  },
  'preacher_curls': {
    id: 'preacher_curls',
    name: 'Preacher Curls',
    muscleGroup: ['Arms'],
    description: 'Strict bicep isolation eliminating momentum.',
    steps: [
      'Sit at preacher bench with upper arms on pad.',
      'Curl weight up towards shoulders.',
      'Lower with control, feeling the stretch.'
    ],
    tips: ['Don\'t go too heavy.', 'Full range of motion.'],
    defaultSets: 3,
    defaultReps: '10-12',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-preacher-curl-front.mp4'
  },
  'close_grip_bench': {
    id: 'close_grip_bench',
    name: 'Close-Grip Bench Press',
    muscleGroup: ['Arms', 'Chest'],
    description: 'Compound tricep exercise with chest involvement.',
    steps: [
      'Lie on bench with narrow grip on barbell.',
      'Lower bar to lower chest, keeping elbows tucked.',
      'Press back up, focusing on tricep contraction.'
    ],
    tips: ['Hands about shoulder-width apart.', 'Keep elbows close to body.'],
    defaultSets: 3,
    defaultReps: '8-10',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-close-grip-bench-press-front.mp4'
  },

  // CORE EXERCISES
  'planks': {
    id: 'planks',
    name: 'Plank Hold',
    muscleGroup: ['Core'],
    description: 'Isometric core exercise for overall stability.',
    steps: [
      'Get into push-up position on forearms.',
      'Keep body in straight line from head to heels.',
      'Hold position while breathing normally.'
    ],
    tips: ['Don\'t let hips sag or pike.', 'Squeeze glutes and abs.'],
    defaultSets: 3,
    defaultReps: '45-60 sec',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-front-plank-side.mp4'
  },
  'crunches': {
    id: 'crunches',
    name: 'Crunches',
    muscleGroup: ['Core'],
    description: 'Classic ab exercise targeting upper rectus abdominis.',
    steps: [
      'Lie on back with knees bent, hands behind head.',
      'Curl shoulders off ground towards knees.',
      'Lower with control, don\'t pull on neck.'
    ],
    tips: ['Keep lower back pressed into floor.', 'Exhale as you crunch up.'],
    defaultSets: 3,
    defaultReps: '15-20',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-crunch-side.mp4'
  },
  'leg_raises': {
    id: 'leg_raises',
    name: 'Hanging Leg Raises',
    muscleGroup: ['Core'],
    description: 'Advanced ab exercise targeting lower abs.',
    steps: [
      'Hang from pull-up bar with arms extended.',
      'Raise legs until parallel with floor or higher.',
      'Lower with control, avoiding swinging.'
    ],
    tips: ['Keep legs straight for more difficulty.', 'Control the descent.'],
    defaultSets: 3,
    defaultReps: '10-15',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hanging-leg-raise-front.mp4'
  },
  'russian_twists': {
    id: 'russian_twists',
    name: 'Russian Twists',
    muscleGroup: ['Core'],
    description: 'Rotational core exercise for obliques.',
    steps: [
      'Sit with knees bent, lean back slightly, feet off ground.',
      'Hold weight or medicine ball, rotate torso side to side.',
      'Touch weight to floor on each side.'
    ],
    tips: ['Keep feet elevated.', 'Control the rotation.'],
    defaultSets: 3,
    defaultReps: '20 total',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-russian-twist-front.mp4'
  },
  'cable_woodchops': {
    id: 'cable_woodchops',
    name: 'Cable Woodchops',
    muscleGroup: ['Core'],
    description: 'Rotational movement for functional core strength.',
    steps: [
      'Set cable high, stand sideways to machine.',
      'Pull handle diagonally down and across body.',
      'Control return to starting position.'
    ],
    tips: ['Rotate from hips and core.', 'Keep arms extended.'],
    defaultSets: 3,
    defaultReps: '12 each side',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-cable-woodchop-front.mp4'
  },
  'dead_bug': {
    id: 'dead_bug',
    name: 'Dead Bug',
    muscleGroup: ['Core'],
    description: 'Anti-extension core exercise for stability.',
    steps: [
      'Lie on back with arms extended to ceiling, legs in tabletop.',
      'Lower opposite arm and leg towards floor.',
      'Return to start and repeat on other side.'
    ],
    tips: ['Keep lower back pressed into floor.', 'Move slowly and controlled.'],
    defaultSets: 3,
    defaultReps: '10 each side',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-dead-bug-front.mp4'
  },

  // CARDIO
  'jump_rope': {
    id: 'jump_rope',
    name: 'Jump Rope',
    muscleGroup: ['Cardio', 'Legs'],
    description: 'High-intensity cardio exercise for conditioning.',
    steps: [
      'Hold rope handles at hip level.',
      'Jump just high enough for rope to pass under feet.',
      'Land softly on balls of feet.'
    ],
    tips: ['Keep elbows close to body.', 'Start with short intervals.'],
    defaultSets: 5,
    defaultReps: '1 min',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-jump-rope-front.mp4'
  },
  'burpees': {
    id: 'burpees',
    name: 'Burpees',
    muscleGroup: ['Cardio', 'Core', 'Chest'],
    description: 'Full body conditioning exercise.',
    steps: [
      'Start standing, drop to squat with hands on floor.',
      'Jump feet back to plank, do a push-up.',
      'Jump feet to hands, then jump up with arms overhead.'
    ],
    tips: ['Maintain good form over speed.', 'Land softly.'],
    defaultSets: 3,
    defaultReps: '10-15',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-burpee-front.mp4'
  },
  'mountain_climbers': {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    muscleGroup: ['Cardio', 'Core'],
    description: 'Dynamic cardio exercise targeting core and conditioning.',
    steps: [
      'Start in plank position.',
      'Drive one knee towards chest, then quickly switch legs.',
      'Continue alternating in running motion.'
    ],
    tips: ['Keep hips level.', 'Maintain plank position.'],
    defaultSets: 3,
    defaultReps: '30 sec',
    gif: 'https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-mountain-climber-front.mp4'
  }
};

// Helper function to get exercises by muscle group
export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return Object.values(EXERCISES).filter(ex => 
    ex.muscleGroup.includes(muscleGroup as any)
  );
};

export const PROGRAMS: Program[] = [
  {
    id: 'ppl_beginner',
    title: 'Push Pull Legs (Beginner)',
    description: 'A classic 3-day split to build mass and strength.',
    level: 'Beginner',
    days: [
      {
        id: 'push_1',
        title: 'Push Day (Chest/Shoulders/Tri)',
        exercises: ['bench_press', 'incline_db_press', 'overhead_press', 'lateral_raises', 'tricep_pushdown']
      },
      {
        id: 'pull_1',
        title: 'Pull Day (Back/Bi)',
        exercises: ['pull_ups', 'barbell_rows', 'lat_pulldown', 'face_pulls', 'bicep_curls']
      },
      {
        id: 'legs_1',
        title: 'Leg Day (Quads/Hams)',
        exercises: ['squat', 'leg_press', 'romanian_deadlift', 'leg_curl', 'calf_raises']
      }
    ]
  },
  {
    id: 'full_body',
    title: 'Full Body Blaster',
    description: 'Hit everything in one intense session.',
    level: 'Intermediate',
    days: [
      {
        id: 'full_1',
        title: 'Full Body A',
        exercises: ['squat', 'bench_press', 'barbell_rows', 'overhead_press', 'planks']
      },
      {
        id: 'full_2',
        title: 'Full Body B',
        exercises: ['deadlift', 'incline_db_press', 'pull_ups', 'lunges', 'russian_twists']
      }
    ]
  }
];
