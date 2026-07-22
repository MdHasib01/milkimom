export interface ReviewType {
  id: string;
  n: string;
  t: string;
  stars: number;
  timeText: string;
}

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Name parts
const fNamesEN = ["Sadia", "Mim", "Rimi", "Nishi", "Sharmin", "Tasnim", "Nusrat", "Jannat", "Sathi", "Popy", "Sumaya", "Tanjina", "Farhana", "Rupa", "Tasnia", "Rokeya", "Ayesha", "Khadija"];
const fNamesBN = ["সাদিয়া", "মিম", "রিমি", "নুসরাত", "তাসনিম", "সাথী", "সুমাইয়া", "ফারহানা", "তানজিনা", "রুপা", "আয়েশা", "পপি", "শারমিন"];

const mNamesEN = ["Islam", "Akter", "Hossain", "Jahan", "Khatun", "Ferdous", "Rahman", "Sultana", "Begum"];
const mNamesBN = ["ইসলাম", "আক্তার", "হোসেন", "জাহান", "খাতুন", "ফেরদৌস", "রহমান", "সুলতানা", "বেগম"];

const lNamesEN = ["Sumi", "Mim", "Rimi", "Nishi", "Sathi", "Rupa"];
const lNamesBN = ["সুমি", "মিম", "রিমি", "নিশি", "সাথী", "রুপা"];

// Local memory history to prevent repetitions
interface MemoryItem {
  n: string;
  t: string;
  timestamp: number;
}

const historyMemory: MemoryItem[] = [];

function generateName(): string {
  const type = Math.random();
  let name = "";
  if (type < 0.2) { // 20% one word
    name = Math.random() < 0.5 ? getRandomItem(fNamesEN) : getRandomItem(fNamesBN);
  } else if (type < 0.65) { // 45% two word
    name = Math.random() < 0.5 
      ? `${getRandomItem(fNamesEN)} ${getRandomItem(mNamesEN)}`
      : `${getRandomItem(fNamesBN)} ${getRandomItem(mNamesBN)}`;
  } else { // 35% three word
    name = Math.random() < 0.5 
      ? `${getRandomItem(fNamesEN)} ${getRandomItem(mNamesEN)} ${getRandomItem(lNamesEN)}`
      : `${getRandomItem(fNamesBN)} ${getRandomItem(mNamesBN)} ${getRandomItem(lNamesBN)}`;
  }

  // Slight capitalization differences for English names
  if (Math.random() < 0.1 && /^[a-zA-Z\s]+$/.test(name)) {
     return Math.random() < 0.5 ? name.toLowerCase() : name.toUpperCase();
  }
  return name;
}

// Complex combination templates to generate 1000+ variations
const deliveryIntroBN = ["প্রোডাক্টটা হাতে পেলাম,", "আজকেই প্রোডাক্ট রিসিভ করলাম,", "ডেলিভারি অনেক ফাস্ট ছিল,", "প্যাকেজিংটা দেখলাম,"];
const deliveryEndBN = [" ধন্যবাদ মিল্কিমমকে।", " ইনশাআল্লাহ কাল থেকে শুরু করবো।", " অনেক প্রিমিয়াম মনে হয়েছে।", " প্যাকেজিং খুব ভালো ছিল।", " অরিজিনাল প্রোডাক্ট পেয়েছি।"];

const deliveryIntroEN = ["Product ta hate pelam,", "Ajkei receive korlam,", "Delivery ta onek fast chilo,", "Packaging dekhe valo laglo,"];
const deliveryEndEN = [" inshallah kal theke khabo.", " thank you milkimom.", " onek premium packaging.", " original product hate peyechi.", " try kore dekhbo ebar."];

const day1IntroBN = ["আলহামদুলিল্লাহ, ১ দিন খাওয়ার পর থেকেই", "কালকে শুরু করেছি, আজকেই", "প্রথম দিন থেকেই", "১ দিন পর থেকেই"];
const day1EndBN = [" বুকে টান টান অনুভব করছিলাম।", " পরিবর্তন বুঝতে পারছি।", " ফ্লো ভালো মনে হচ্ছে।", " দুধ আসা শুরু হয়েছে মনে হচ্ছে।"];

const day1IntroEN = ["Alhamdulillah, 1 din khaowar por thekei", "Kalke start korsi, ajkei", "Prothom din thekei", "1 din geleo"];
const day1EndEN = [" change bujhte parchi.", " flow ta better lagche.", " ektu var var lagche.", " poriborton bujhte parchi."];

const day3IntroBN = ["ভাবিনি কাজ করবে, কিন্তু", "বিশ্বাস ছিল না, তবে", "সত্যি বলতে", "আলহামদুলিল্লাহ,"];
const day3EndBN = [" ৩ দিনের মধ্যেই বুকের দুধ অনেক বেড়েছে।", " ৩ দিনে ভালো রেজাল্ট বুঝতে পারছি।", " ৩-৪ দিনে অনেক পরিবর্তন দেখেছি।", " ৩ দিনে ফ্লো আগের চেয়ে বেটার।", " ৩ দিনেই বাচ্চার কান্না কমেছে।"];

const day3IntroEN = ["Vabini kaj korbe kintu", "Bishwas chilona, tobe", "Sotti bolte", "Alhamdulillah,"];
const day3EndEN = [" 3 diner moddhei flow onek bereche.", " 3 dine bhalo result pacchi.", " 3-4 dine onek change dekhesi.", " 3 dine flow ager theke better.", " 3 dine result bujhlam."];

const flowIncBN = ["বুকের দুধের ফ্লো আগের চেয়ে অনেক বেড়েছে।", "এখন আগের মত চিন্তা করতে হয়না, ফ্লো ভালো।", "ফ্লো আগের চেয়ে বেটার, বাবু পেট ভরে খেতে পারে।", "বাচ্চা এখন পেট ভরে খেতে পারছে, দুধ অনেক বেড়েছে।"];
const flowIncEN = ["Milk flow ager cheye onek bereche.", "Ekhon r tension nai, flow valo.", "Flow ager cheye better, baccha pet vore khay.", "Baccha ekhon satisfy, milk bereche onek."];

const stoppedMilkBN = ["আমার বুকের দুধ প্রায় বন্ধ হয়ে গিয়েছিল।", "একদম দুধ বন্ধ হয়ে গিয়েছিল অনেক ট্রাই করেও কাজ হয়নি।", "দুধ একদম কমে গিয়েছিল।"];
const stoppedMilkEndBN = [" মিল্কিমম খাওয়ার ২-৩ দিনের মধ্যে আবার দুধ আসতে শুরু করে।", " খাওয়ার পর আবার দুধ আসা শুরু হয়েছে।", " এখন আবার বাবু পেট ভরে খেতে পারছে।", " অনেক দিন পর আবার বুকের দুধ ফিরে পেয়েছি।"];

const stoppedMilkEN = ["Amar breast milk pray bondho hoye gechilo.", "Ekdom dudh kom chilo, ashtoi na pray.", "Dudh pray sedhe gechilo vabsi abr asbena."];
const stoppedMilkEndEN = [" Milkimom khey 3 diner moddhe abr ashte shuru kore.", " khawar por abar ashte shuru koreche.", " ekhon abar baccha pet vore khacche.", " alhamdulillah abar ashteche."];

const pumpBN = ["পাম্প করলেও আগে খুব কম পেতাম।", "আগে পাম্পে খুব অল্প আসতো।", "অফিসে যাবার সময় পাম্প করে রেখে যাই, আগে কম হতো।"];
const pumpEndBN = [" এখন আগের চেয়ে অনেক বেশি পাচ্ছি।", " এখন পাম্পেও ভালো পরিমাণে পাচ্ছি।", " এখন পাম্পেও বেশ দুধ আসে।"];

const pumpEN = ["Pump korleo age khub kom petam.", "Age pumpe khub olpo asto.", "Office e jaoar somoy pump kori, age kom ashto."];
const pumpEndEN = [" Ekhon ager cheye onek beshi pacchi.", " Ekhon valoi pacchi alhamdulillah.", " Ekhon pump korle valo flow payi."];

const formulaBN = ["আগে প্রায় প্রতিবারই ফর্মুলা দিতে হতো।", "বাবু ফর্মুলাও খেত।", "খুব চিন্তা হতো ফর্মুলা নিয়ে।"];
const formulaEndBN = [" এখন বেশিরভাগ সময় বুকের দুধেই হয়ে যায়।", " এখন বাবুকে আর ফর্মুলা কম দিতে হচ্ছে।", " আলহামদুলিল্লাহ এখন ফর্মুলার উপর নির্ভর করতে হয় না।", " এখন বুকের দুধেই বাবুর পেট ভরে।"];

const formulaEN = ["Age formula dite hoto.", "Baby formula o khato.", "Formula niye onek tension e chilam."];
const formulaEndEN = [" Ekhon mostly breast milk ei hoye jay.", " Ekhon formula kom dite hocche.", " Alhamdulillah ekhon r formula lage na.", " Ekhon buker dudhei bacchar pet vore."];

const doseBN = ["১৫ দিনের ডোজ শেষ।", "পুরো কোর্স শেষ করলাম।", "অনেকদিন ধরে খাচ্ছি।"];
const doseEndBN = [" ফ্লো এখনো ভালো আছে।", " বুকের দুধের ফ্লো আগের মতোই রেগুলার আছে এখন।", " অনেক শান্তি লাগে এখন।", " সবার জন্য রিকমেন্ড করছি।"];

const doseEN = ["15 diner dose sesh.", "Puro course shesh korlam.", "Besh kichudin dhore khacchi."];
const doseEndEN = [" Flow ekhono bhalo ache.", " Flow regular ache ekhon.", " Onek shanti lagche.", " Sobar jonno recommend korchi."];

function buildCombo(arr1: string[], arr2: string[]): string {
  return getRandomItem(arr1) + getRandomItem(arr2);
}

function generateText(): string {
  const randomStage = Math.random();
  const lang = Math.random();
  const isBn = lang < 0.5;

  if (randomStage < 0.10) { // 1. Delivery
    return isBn ? buildCombo(deliveryIntroBN, deliveryEndBN) : buildCombo(deliveryIntroEN, deliveryEndEN);
  } else if (randomStage < 0.25) { // 2. Day 1
    return isBn ? buildCombo(day1IntroBN, day1EndBN) : buildCombo(day1IntroEN, day1EndEN);
  } else if (randomStage < 0.50) { // 3. Day 3
    return isBn ? buildCombo(day3IntroBN, day3EndBN) : buildCombo(day3IntroEN, day3EndEN);
  } else if (randomStage < 0.65) { // 4. Flow inc
    return isBn ? getRandomItem(flowIncBN) : getRandomItem(flowIncEN);
  } else if (randomStage < 0.80) { // 5. Stopped milk
    return isBn ? buildCombo(stoppedMilkBN, stoppedMilkEndBN) : buildCombo(stoppedMilkEN, stoppedMilkEndEN);
  } else if (randomStage < 0.88) { // 6. Pump
    return isBn ? buildCombo(pumpBN, pumpEndBN) : buildCombo(pumpEN, pumpEndEN);
  } else if (randomStage < 0.96) { // 7. Formula
    return isBn ? buildCombo(formulaBN, formulaEndBN) : buildCombo(formulaEN, formulaEndEN);
  } else { // 8. Complete dose
    return isBn ? buildCombo(doseBN, doseEndBN) : buildCombo(doseEN, doseEndEN);
  }
}

export function generateRandomReview(): ReviewType {
  const isFiveStar = Math.random() < 0.90; // 90% 5 star
  return {
    id: Math.random().toString(36).substring(2, 11),
    n: generateName(),
    t: generateText(),
    stars: isFiveStar ? 5 : 4,
    timeText: `মাত্র ${getRandomInt(5, 59)} সেকেন্ড আগে সাবমিট করেছেন`
  };
}

export function generateUniqueReview(existing: ReviewType[]): ReviewType {
  let newReview: ReviewType;
  let attempts = 0;
  let isValid = false;

  const now = Date.now();
  const FIVE_MIN = 5 * 60 * 1000;
  const TWO_MIN = 2 * 60 * 1000;
  const TEN_MIN = 10 * 60 * 1000;
  const FIFTEEN_MIN = 15 * 60 * 1000;

  do {
    newReview = generateRandomReview();
    attempts++;

    // Clean old history older than 20 mins to keep memory light
    while (historyMemory.length > 0 && (now - historyMemory[0].timestamp) > 20 * 60 * 1000) {
      historyMemory.shift();
    }
    
    // Maintain max 100 items
    if (historyMemory.length > 100) {
       historyMemory.slice(-100);
    }

    let failRule = false;

    // Checks:
    let nameCountIn15Min = 0;

    for (let i = historyMemory.length - 1; i >= 0; i--) {
       const mem = historyMemory[i];
       const timeDiff = now - mem.timestamp;

       // 1. Same text within 5 mins
       if (mem.t === newReview.t && timeDiff < FIVE_MIN) {
           failRule = true;
           break;
       }

       // 2. Same name within 2 mins
       if (mem.n === newReview.n && timeDiff < TWO_MIN) {
           failRule = true;
           break;
       }

       // 3. Same name + review pair within 10 mins
       if (mem.n === newReview.n && mem.t === newReview.t && timeDiff < TEN_MIN) {
           failRule = true;
           break;
       }

       // 4. Max 2 reviews from same name within 15 min window
       if (mem.n === newReview.n && timeDiff < FIFTEEN_MIN) {
           nameCountIn15Min++;
           if (nameCountIn15Min >= 2) {
               failRule = true;
               break;
           }
       }
    }

    // Also check current visible existing items (back to back)
    if (!failRule && existing.length > 0) {
       if (existing[0].n === newReview.n || existing[0].t === newReview.t) {
          failRule = true;
       }
    }

    isValid = !failRule;
    
  } while (!isValid && attempts < 50);

  // Add to memory
  if (isValid) {
      historyMemory.push({ n: newReview.n, t: newReview.t, timestamp: now });
  }

  return newReview || generateRandomReview();
}
