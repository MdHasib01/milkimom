sed -i 's/const handleScrollToOrder = () => { navigate("\/checkout"); }; \/\/     const el = document.getElementById('\''flavour-selection'\'') || document.getElementById('\''order-form'\'');/const handleScrollToOrder = () => { navigate("\/checkout"); }; \/*/' src/components/SatisfactionGuarantee.tsx
sed -i 's/el.scrollIntoView({ behavior: '\''smooth'\'' });/el.scrollIntoView({ behavior: '\''smooth'\'' });/' src/components/SatisfactionGuarantee.tsx
sed -i 's/    }/    } *\//' src/components/SatisfactionGuarantee.tsx
