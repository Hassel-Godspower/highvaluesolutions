export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Later: integrate Email / WhatsApp / CRM
  return res.status(200).json({
    success: true,
    message: 'Message received successfully'
  });
}

