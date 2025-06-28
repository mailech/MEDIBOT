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
import { motion } from 'framer-motion';
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
                  <motion.div
                    key={time}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
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
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          {/* Weekly Calendar */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Overview</h2>
              
              <div className="grid grid-cols-7 gap-2">
                {getWeekDays().map(day => (
                  <div key={day.toISOString()} className="text-center">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      {format(day, 'EEE')}
                    </div>
                    <div className={`text-lg font-semibold p-2 rounded ${
                      format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-900'
                    }`}>
                      {format(day, 'd')}
                    </div>
                    <div className="mt-2 space-y-1">
                      {medications.slice(0, 2).map(med => (
                        <div key={med.id} className="w-full h-1 bg-primary-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Medication List & Settings */}
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Medications</h3>
              
              <div className="space-y-4">
                {medications.map(med => (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{med.name}</h4>
                        <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button className="text-gray-400 hover:text-primary-500">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteMedication(med.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {med.times.map(time => (
                        <span key={time} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                          {time}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleReminder(med.id, 'whatsapp')}
                        className={`flex items-center text-xs ${
                          med.reminderMethods.includes('whatsapp')
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        WhatsApp
                      </button>
                      
                      <button
                        onClick={() => toggleReminder(med.id, 'call')}
                        className={`flex items-center text-xs ${
                          med.reminderMethods.includes('call')
                            ? 'text-blue-600'
                            : 'text-gray-400'
                        }`}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </button>
                      
                      <button
                        onClick={() => toggleReminder(med.id, 'notification')}
                        className={`flex items-center text-xs ${
                          med.reminderMethods.includes('notification')
                            ? 'text-purple-600'
                            : 'text-gray-400'
                        }`}
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Push
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          {/* Reminder Settings */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminder Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">WhatsApp Reminders</div>
                    <div className="text-sm text-gray-600">Get reminders via WhatsApp</div>
                  </div>
                  <div className="w-10 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Voice Call Reminders</div>
                    <div className="text-sm text-gray-600">AI voice calls for important doses</div>
                  </div>
                  <div className="w-10 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Multilingual Support</div>
                    <div className="text-sm text-gray-600">Reminders in your native language</div>
                  </div>
                  <div className="w-10 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Medication</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  value={newMedication.name || ''}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Paracetamol 500mg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  value={newMedication.dosage || ''}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 1 tablet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Times (comma separated)
                </label>
                <input
                  type="text"
                  value={newMedication.times?.join(', ') || ''}
                  onChange={(e) => setNewMedication({ 
                    ...newMedication, 
                    times: e.target.value.split(',').map(t => t.trim()) 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 09:00, 21:00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How many days?</label>
                <input
                  type="number"
                  min={1}
                  className="w-full border rounded px-3 py-2 mb-4"
                  value={newMedication.days || ''}
                  onChange={e => setNewMedication({ ...newMedication, days: Number(e.target.value) })}
                  placeholder="Enter number of days"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Methods
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                    { key: 'call', label: 'Voice Call', icon: Phone },
                    { key: 'notification', label: 'Push Notification', icon: Bell }
                  ].map(({ key, label, icon: Icon }) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newMedication.reminderMethods?.includes(key as any) || false}
                        onChange={(e) => {
                          const methods = newMedication.reminderMethods || [];
                          const updatedMethods = e.target.checked
                            ? [...methods, key as any]
                            : methods.filter(m => m !== key);
                          setNewMedication({ ...newMedication, reminderMethods: updatedMethods });
                        }}
                        className="mr-2"
                      />
                      <Icon className="h-4 w-4 mr-2 text-gray-500" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button onClick={addMedication} className="flex-1">
                Add Medication
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;