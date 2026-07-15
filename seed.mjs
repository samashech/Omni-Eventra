import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uilwolflinnzhxavunzj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbHdvbGZsaW5uemh4YXZ1bnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMjEyNDksImV4cCI6MjA5OTY5NzI0OX0.mMomtNefBOmIC02mUcAzlCam9ry91Prc5NrpXkY3cCQ'
const supabase = createClient(supabaseUrl, supabaseKey)

const clubs = [
  { name: 'RAIoT', category: 'Technology', followers: 840, icon: 'Cpu', color: '#CFFAFE', text_color: '#0891B2', description: 'IoT based robotics club focused on autonomous machines and hardware innovation.' },
  { name: 'E-Cell', category: 'Business', followers: 1200, icon: 'Lightbulb', color: '#FEF3C7', text_color: '#92400E', description: 'Innovation incubation center for student founders and breakthrough startup ideas.' },
  { name: 'IEEE Student Branch', category: 'Technology', followers: 650, icon: 'Zap', color: '#E0E7FF', text_color: '#3730A3', description: 'Advancing technology for humanity through hardware, software, and research.' },
  { name: 'Cultural Fest Committee', category: 'Culture', followers: 1890, icon: 'PartyPopper', color: '#FCE7F3', text_color: '#9D174D', description: "Managing the university's biggest cultural fests, concerts, and celebrity events." }
]

async function seed() {
  const { data, error } = await supabase.from('clubs').insert(clubs).select()
  if (error) console.error('Error inserting clubs:', error)
  else console.log('Successfully inserted clubs:', data)
}

seed()
