import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, useMediaQuery, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const categories = [
  { name: 'צפון', image: '/images/hermon.jpg' },
  { name: 'דרום', image: '/images/south.jpg' },
  { name: 'מרכז', image: '/images/centry.jpg' },
  { name: 'שפלה', image: '/images/shfela.jpg' },
  { name: 'ירושלים והסביבה', image: '/images/jerusalem.jpg' },
  { name: 'נגב', image: '/images/negev.jpg' },
  { name: 'אילת והערבה', image: '/images/eilat.jpg' }
];

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCategoryClick = (region) => {
    navigate('/AllProducts', { state: { preFilterRegion: region } });
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url(/images/timna.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.4)'
        }}
      >
        <Typography variant="h3" color="white" fontWeight={700}>
          חוויה, חיבור ואהבת הארץ
        </Typography>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" fontWeight={600} mb={2}>
          מטיילים. מתחברים. מתאהבים.
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={4}>
          האתר שלנו מחבר בין מטיילים מכל הארץ לבין מדריכי סיורים מקצועיים,
          שמובילים חוויות ייחודיות בכל אזור בארץ. זה המקום להתרגש מחדש מכל נוף, סיפור ואדם בארץ הזו.
          כל סיור מותאם לגיל, תחומי עניין וקצב אישי – עם מדריכים שידליקו לכם את הלב למסלול הבא.
        </Typography>

        <Box display="flex" alignItems="center" mb={4}>
          <Box flexGrow={1} height={1} bgcolor="primary.main" mx={2} />
          <Typography variant="h5" fontWeight={700} color="primary">
            בחר מסלול
          </Typography>
          <Box flexGrow={1} height={1} bgcolor="primary.main" mx={2} />
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat) => (
            <Grid
              item
              key={cat.name}
              xs={12}
              sm={6}
              md={4}
            >
              <Box
                onClick={() => handleCategoryClick(cat.name)}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 3,
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6
                  }
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold'
                  }}
                >
                  {cat.name}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
