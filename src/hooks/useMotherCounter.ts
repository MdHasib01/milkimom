import { useState, useEffect } from 'react';

function getDeterministicRandom(seedStr: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = Math.imul(31, hash) + seedStr.charCodeAt(i) | 0;
  }
  const random = Math.abs(Math.sin(hash));
  return Math.floor(random * (max - min + 1)) + min;
}

export function useMotherCounter() {
  const [counts, setCounts] = useState({
    total: 89746,
    chocolate: 50258,
    vanilla: 29616,
    cardamom: 6282,
    cinnamon: 3590,
    animatePrefix: false
  });

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric', month: 'numeric', day: 'numeric'
    });
    const parts = formatter.formatToParts(new Date());
    const val = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
    const currentDhakaDate = new Date(val('year'), val('month') - 1, val('day'));
    
    const baseDhakaDate = new Date(2026, 5, 22); // June 22, 2026
    
    let daysPassed = Math.floor((currentDhakaDate.getTime() - baseDhakaDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysPassed < 0) daysPassed = 0;

    let targetTotal = 89746;
    for (let i = 1; i <= daysPassed; i++) {
       const loopDate = new Date(baseDhakaDate.getTime() + i * (1000 * 60 * 60 * 24));
       const seedStr = `${loopDate.getFullYear()}-${loopDate.getMonth()}-${loopDate.getDate()}`;
       targetTotal += getDeterministicRandom(seedStr, 360, 400); 
    }

    const targetChocolate = Math.round(targetTotal * 0.56);
    const targetVanilla = Math.round(targetTotal * 0.33);
    const targetCardamom = Math.round(targetTotal * 0.07);
    const targetCinnamon = targetTotal - targetChocolate - targetVanilla - targetCardamom;

    // Load from local storage to check if we need to animate (from old value to new value) daily
    const savedDate = localStorage.getItem('milkimom_counter_date');
    const todayStr = `${val('year')}-${val('month')}-${val('day')}`;
    
    if (savedDate !== todayStr || daysPassed === 0) {
       // Either new day or very first time
       localStorage.setItem('milkimom_counter_date', todayStr);
       localStorage.setItem('milkimom_counter_total', targetTotal.toString());
       
       setCounts({
          total: targetTotal,
          chocolate: targetChocolate,
          vanilla: targetVanilla,
          cardamom: targetCardamom,
          cinnamon: targetCinnamon,
          animatePrefix: true
       });
       
       const tm = setTimeout(() => {
         setCounts(prev => ({ ...prev, animatePrefix: false }));
       }, 3000);
       
       return () => clearTimeout(tm);
    } else {
       // Already seen today, just show target
       setCounts({
          total: targetTotal,
          chocolate: targetChocolate,
          vanilla: targetVanilla,
          cardamom: targetCardamom,
          cinnamon: targetCinnamon,
          animatePrefix: false
       });
    }

  }, []);

  return counts;
}
