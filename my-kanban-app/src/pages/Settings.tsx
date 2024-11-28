import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomTheme } from '../context/ThemeContext';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { MenuItem, Select } from '@mui/material';

export const Settings = () => {
  const { toggleTheme, mode } = useCustomTheme();
  const [t, i18n] = useTranslation('global')
  const handleChange = () => {
    toggleTheme();
  };
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  };

  return (

    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('settings.title')}
        </Typography>
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={handleChange} />}
          label="Dark Mode"
        />

        <Select
          value={i18n.language}
          onChange={(e) => handleChangeLanguage(e.target.value as string)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="heb">עברית</MenuItem>
        </Select>
      </Box>
    </Container>





  )
}
