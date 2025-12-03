import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const categories = [
  {
    name: 'צפון',
    image: '/images/hermon.jpg'
  },
  {
    name: 'דרום',
    image: '/images/south.jpg'
  },
  {
    name: 'מרכז',
    image: '/images/centry.jpg'
  },
  {
    name: 'שפלה',
    image: '/images/shfela.jpg'
  },
  {
    name: 'ירושלים והסביבה',
    image: '/images/jerusalem.jpg'
  },
  {
    name: 'נגב',
    image: '/images/negev.jpg'
  },
  {
    name: ' אילת והערבה',
    image: '/images/eilat.jpg'
  }
];

export default function CategoryGrid() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCategoryClick = (region) => {
    navigate('/AllProducts', { state: { preFilterRegion: region } });
  };

  return (

    <Box p={3}>
      <Typography variant="h4" textAlign="center" mb={4}>
        בחר אזור לסיורים
      </Typography>

      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
        {categories.map((cat) => (
          <Grid
            key={cat.name}
            sx={{
              gridColumn: {
                xs: 'span 4', // 100% ברוחב מלא במובייל (4 מתוך 4)
                sm: 'span 4', // חצי שורה בטאבלט (4 מתוך 8)
                md: 'span 3', // שליש שורה בדסקטופ (3 מתוך 12)
              }
            }}
          >
            <Box
              onClick={() => handleCategoryClick(cat.name)}
              sx={{
                aspectRatio: '4 / 3', // זה נותן יחס של 4:3 — אפשר גם '1' לריבוע או '16 / 9'
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 3,
                position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s',
                backgroundImage: 'url("/images/north.jpg")', backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6
                }
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
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

    </Box>
  );
}
