import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Bell, 
  Clock, 
  Phone, 
  MessageSquare,
  Calendar,
  Pill,
  Edit3,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';
import { useLanguage } from '../contexts/LanguageContext';
import { Medication } from '../types';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const MedicationReminders: React.FC = () => {
  const { t } = useLanguage();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Paracetamol 500mg',
      dosage: '1 tablet',
      frequency: 'Twice daily',
      duration: '5 days',
      times: ['09:00', '21:00'],
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      reminderMethods: ['whatsapp', 'call'],
      taken: false
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      dosage: '1 capsule',
      frequency: 'Three times daily',
      duration: '7 days',
      times: ['08:00', '14:00', '20:00'],
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      reminderMethods: ['whatsapp', 'notification'],
      taken: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState<Partial<Medication> & { days?: number }>({
    reminderMethods: ['whatsapp']
  });

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.times && newMedication.days) {
      const duration = `${newMedication.days} days`;
      const startDate = newMedication.startDate || new Date();
      const endDate = addDays(startDate, newMedication.days);
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMedication.name,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency || '',
        duration,
        times: newMedication.times,
        startDate,
        endDate,
        reminderMethods: newMedication.reminderMethods || ['whatsapp'],
        taken: false
      };
      setMedications([...medications, medication]);
      setNewMedication({ reminderMethods: ['whatsapp'] });
      setShowAddForm(false);
    }
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const toggleReminder = (medicationId: string, method: 'whatsapp' | 'call' | 'notification') => {
    setMedications(medications.map(med => {
      if (med.id === medicationId) {
        const methods = med.reminderMethods.includes(method)
          ? med.reminderMethods.filter(m => m !== method)
          : [...med.reminderMethods, method];
        return { ...med, reminderMethods: methods };
      }
      return med;
    }));
  };

  const getWeekDays = () => {
    const start = startOfWeek(new Date());
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getTodaySchedule = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const schedule: { time: string; medications: Medication[] }[] = [];
    
    medications.forEach(med => {
      med.times.forEach(time => {
        const existing = schedule.find(s => s.time === time);
        if (existing) {
          existing.medications.push(med);
        } else {
          schedule.push({ time, medications: [med] });
        }
      });
    });

    return schedule.sort((a, b) => a.time.localeCompare(b.time));
  };

  const markTaken = (id: string) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, taken: true } : med
    ));
  };

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0).getTime() - now.getTime();
    const timeout = setTimeout(() => {
      setMedications(meds => meds.map(med => ({ ...med, taken: false })));
    }, msUntilMidnight);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medication Reminders</h1>
          <p className="text-gray-600 mt-2">Never miss a dose with smart reminders</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                Today's Schedule
              </h2>
              
              <div className="space-y-4">
                {getTodaySchedule().map(({ time, medications: meds }, index) => (
                  <div
                    key={time}
                    className="flex items-center p-4 bg-gray-50 rounded-lg animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-lg font-semibold text-gray-900">{time}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </div>
                    </div>
                    
                    <div className="flex-1 ml-4">
                      {meds.map(med => (
                        <div key={med.id} className="flex items-center justify-between mb-2 last:mb-0">
                          <div className="flex items-center">
                            <Pill className="h-4 w-4 text-primary-500 mr-2" />
                            <div>
                              <div className={`font-medium text-gray-900 ${med.taken ? 'line-through text-gray-400' : ''}`}>{med.name}</div>
                              <div className="text-sm text-gray-600">{med.dosage}</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => markTaken(med.id)} disabled={med.taken}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Taken
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Weekly Calendar */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Calendar</h2>
              <div className="grid grid-cols-7 gap-2">
                {getWeekDays().map((day, index) => (
                  <div key={index} className="text-center p-2 border rounded">
                    <div className="text-xs text-gray-500 mb-1">
                      {format(day, 'EEE')}
                    </div>
                    <div className="text-sm font-medium">
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Medication List */}
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Medications</h2>
              <div className="space-y-4">
                {medications.map(med => (
                  <div key={med.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{med.name}</h3>
                      <Button size="sm" variant="outline" onClick={() => deleteMedication(med.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{med.dosage} • {med.frequency}</p>
                    <p className="text-xs text-gray-500 mb-3">Duration: {med.duration}</p>
                    
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-700">Reminder Methods:</div>
                      <div className="flex flex-wrap gap-2">
                        {(['whatsapp', 'call', 'notification'] as const).map(method => (
                          <button
                            key={method}
                            onClick={() => toggleReminder(med.id, method)}
                            className={`flex items-center px-2 py-1 rounded text-xs ${
                              med.reminderMethods.includes(method)
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {method === 'whatsapp' && <MessageSquare className="h-3 w-3 mr-1" />}
                            {method === 'call' && <Phone className="h-3 w-3 mr-1" />}
                            {method === 'notification' && <Bell className="h-3 w-3 mr-1" />}
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Medication</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                  <input
                    type="text"
                    value={newMedication.name || ''}
                    onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Paracetamol 500mg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={newMedication.dosage || ''}
                    onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 1 tablet"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                  <input
                    type="number"
                    value={newMedication.days || ''}
                    onChange={(e) => setNewMedication({...newMedication, days: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="7"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Times (comma-separated)</label>
                  <input
                    type="text"
                    value={newMedication.times?.join(', ') || ''}
                    onChange={(e) => setNewMedication({...newMedication, times: e.target.value.split(',').map(t => t.trim())})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="09:00, 21:00"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button onClick={addMedication} className="flex-1">
                  Add Medication
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;