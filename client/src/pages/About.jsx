import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
        py: 0,
        minHeight: "100vh"
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 300,
          backgroundImage: 'url(/images/timna.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.4)'
        }}
      >
        <Typography variant="h3" color="white" fontWeight={700}>
          אהבת הארץ • חווית חיים
        </Typography>
      </Box>

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
            אודות האתר
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            האתר שלנו נבנה מתוך אהבה עמוקה לארץ ישראל, לנופיה המדהימים ולאנשיה.
            אנו מאמינים שלכל אדם מגיע להתחבר למקום בו הוא חי – דרך חוויה, ידע, והנאה אמיתית.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="body1" sx={{ mt: 4, lineHeight: 1.8 }}>
            האתר מרכז מדריכי טיולים מהשורה הראשונה – מהצפון ועד הדרום,
            מהמדבריות הקסומות של הנגב והערבה ועד יופיה של ירושלים, הכרמל, הגליל ואפילו חופי אילת.
            המדריכים שלנו נבחרים בקפידה ויודעים לא רק להדריך – אלא גם לרגש, להלהיב ולספר סיפור שיחקק בלב.
            <br /><br />
            המטרה שלנו פשוטה: לחבר בין מטיילים מכל הארץ לבין טיולים בהתאמה אישית,
            עם ליווי מקצועי, הסברים מרתקים, ואווירה שאין שני לה.
            המטיילים שלנו מדווחים על חוויות בלתי נשכחות, תשוקה לעוד טיולים, ורצון להעמיק את הקשר לארץ.
            <br /><br />
            ברוכים הבאים למקום שבו כל מסלול הוא הרפתקה חדשה,
            וכל טיול הופך לזיכרון מתוק.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
