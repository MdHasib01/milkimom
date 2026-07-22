import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.log("No credentials in env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        customer_name: "Test",
        phone: "01711111111",
        alternative_phone: "",
        district: "Dhaka",
        thana: "Mirpur",
        address: "Test address",
        flavour: "Vanilla",
        payment_method: "Cash on Delivery",
        price: 1000,
        transaction_id: null,
        screenshot_uploaded: false,
        page_url: "http://localhost",
        order_time: new Date().toISOString(),
        status: "pending"
      }
    ]);
  
  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("Insert success:", data);
  }
}

test();
