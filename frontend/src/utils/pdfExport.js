import jsPDF from 'jspdf'

export const exportJournalToPDF = (entry) => {
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(20)
  doc.text(entry.title || 'Untitled Entry', 20, 20)
  
  // Add date
  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  const date = new Date(entry.created_at).toLocaleDateString()
  doc.text(`Date: ${date}`, 20, 30)
  
  // Add mood if available
  if (entry.mood) {
    doc.text(`Mood: ${entry.mood}`, 20, 37)
  }
  
  // Add tags if available
  if (entry.tags && entry.tags.length > 0) {
    doc.text(`Tags: ${entry.tags.join(', ')}`, 20, 44)
  }
  
  // Add content
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)
  const content = entry.content.replace(/<[^>]*>/g, '') // Strip HTML tags
  const lines = doc.splitTextToSize(content, 170)
  doc.text(lines, 20, 55)
  
  // Save PDF
  doc.save(`journal-entry-${entry.id}-${date.replace(/\//g, '-')}.pdf`)
}

export const exportMultipleJournalsToPDF = (entries) => {
  const doc = new jsPDF()
  let yPos = 20
  
  entries.forEach((entry, index) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    
    // Add entry title
    doc.setFontSize(16)
    doc.text(entry.title || `Entry ${index + 1}`, 20, yPos)
    yPos += 10
    
    // Add date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    const date = new Date(entry.created_at).toLocaleDateString()
    doc.text(date, 20, yPos)
    yPos += 8
    
    // Add content
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    const content = entry.content.replace(/<[^>]*>/g, '')
    const lines = doc.splitTextToSize(content, 170)
    doc.text(lines, 20, yPos)
    yPos += lines.length * 7 + 10
  })
  
  doc.save(`journal-entries-${new Date().toISOString().split('T')[0]}.pdf`)
}

export const exportMoodHistoryToPDF = (moodLogs) => {
  const doc = new jsPDF()
  
  // Title
  doc.setFontSize(20)
  doc.text('Mood History Report', 20, 20)
  
  // Date range
  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  if (moodLogs.length > 0) {
    const firstDate = new Date(moodLogs[moodLogs.length - 1].created_at).toLocaleDateString()
    const lastDate = new Date(moodLogs[0].created_at).toLocaleDateString()
    doc.text(`Period: ${firstDate} to ${lastDate}`, 20, 30)
  }
  
  // Mood entries
  let yPos = 45
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)
  
  moodLogs.forEach((log) => {
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    
    const date = new Date(log.created_at).toLocaleDateString()
    doc.text(`${date} - ${log.mood_type} (Intensity: ${log.intensity}/10)`, 20, yPos)
    if (log.notes) {
      yPos += 7
      const notes = log.notes.substring(0, 80)
      doc.text(`Notes: ${notes}${log.notes.length > 80 ? '...' : ''}`, 25, yPos)
    }
    yPos += 12
  })
  
  doc.save(`mood-history-${new Date().toISOString().split('T')[0]}.pdf`)
}

