import React from "react";
import { CheckIn } from "../../entities/all.js";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Input, Label } from "../ui/form.jsx";
import { Plus, CheckCircle, X } from "lucide-react";

export default function CheckInManager({ checkIns, onUpdate, language = 'en' }) {
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    scheduled_time: '',
    grace_period_minutes: 15
  });

  const texts = {
    en: {
      title: 'Check-In Timer',
      description: 'Set a timer and we\'ll check if you\'re safe',
      create: 'Create Check-In',
      checkInTitle: 'What are you doing?',
      when: 'When should we check in?',
      gracePeriod: 'Grace period (minutes)',
      save: 'Start Check-In',
      cancel: 'Cancel',
      active: 'Active Check-Ins',
      complete: 'I\'m Safe',
      none: 'No active check-ins'
    },
    hi: {
      title: 'चेक-इन टाइमर',
      description: 'एक टाइमर सेट करें और हम देखेंगे कि आप सुरक्षित हैं',
      create: 'चेक-इन बनाएं',
      checkInTitle: 'आप क्या कर रहे हैं?',
      when: 'हमें कब चेक करना चाहिए?',
      gracePeriod: 'ग्रेस पीरियड (मिनट)',
      save: 'चेक-इन शुरू करें',
      cancel: 'रद्द करें',
      active: 'सक्रिय चेक-इन',
      complete: 'मैं सुरक्षित हूं',
      none: 'कोई सक्रिय चेक-इन नहीं'
    }
  };

  const t = texts[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CheckIn.create({
        ...formData,
        status: 'active'
      });
      setShowForm(false);
      setFormData({
        title: '',
        scheduled_time: '',
        grace_period_minutes: 15
      });
      onUpdate();
    } catch (error) {
      console.error('Error creating check-in:', error);
    }
  };

  const handleComplete = async (checkInId) => {
    try {
      await CheckIn.update(checkInId, {
        status: 'completed',
        completed_at: new Date().toISOString()
      });
      onUpdate();
    } catch (error) {
      console.error('Error completing check-in:', error);
    }
  };

  const getDefaultDateTime = () => {
    const now = new Date();
    const oneHour = new Date(now.getTime() + 60 * 60 * 1000);
    return oneHour.toISOString().slice(0, 16);
  };

  return (
    <Card style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          {t.title}
        </CardTitle>
        <p style={{ color: 'var(--text-secondary)' }}>{t.description}</p>
      </CardHeader>
      <CardContent>
        {!showForm ? (
          <div>
            <Button 
              onClick={() => setShowForm(true)}
              className="w-full mb-4"
              style={{ backgroundColor: 'var(--accent-purple)' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.create}
            </Button>

            <div className="space-y-3">
              <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {t.active}
              </h4>
              
              {checkIns.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t.none}
                </p>
              ) : (
                checkIns.map((checkIn) => (
                  <div
                    key={checkIn.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <div>
                      <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {checkIn.title}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {new Date(checkIn.scheduled_time).toLocaleDateString()} {new Date(checkIn.scheduled_time).toLocaleTimeString()}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleComplete(checkIn.id)}
                      style={{ backgroundColor: 'var(--success-green)' }}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {t.complete}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">{t.checkInTitle}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Going for a run..."
                required
              />
            </div>

            <div>
              <Label htmlFor="scheduled_time">{t.when}</Label>
              <Input
                id="scheduled_time"
                type="datetime-local"
                value={formData.scheduled_time || getDefaultDateTime()}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_time: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="grace_period">{t.gracePeriod}</Label>
              <Input
                id="grace_period"
                type="number"
                value={formData.grace_period_minutes}
                onChange={(e) => setFormData(prev => ({ ...prev, grace_period_minutes: parseInt(e.target.value) }))}
                min="5"
                max="60"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" style={{ backgroundColor: 'var(--accent-purple)' }}>
                {t.save}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                {t.cancel}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}