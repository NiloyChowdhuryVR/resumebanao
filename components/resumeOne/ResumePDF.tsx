import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// ✅ Styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  text: {
    marginBottom: 5,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
});

const ResumePDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* ✅ Header */}
        <View style={styles.section}>
          <Text style={styles.header}>Alex Johnson</Text>
          <Text>Senior Software Engineer</Text>
          <Text>Email: alex.johnson@example.com</Text>
          <Text>Phone: (555) 123-4567</Text>
          <Text>Location: San Francisco, CA</Text>
        </View>

        {/* ✅ Experience Section */}
        <View style={styles.section}>
          <Text style={styles.header}>Experience</Text>
          <Text style={styles.text}>Senior Software Engineer at Tech Innovations Inc.</Text>
          <Text>Jan 2021 - Present | San Francisco, CA</Text>
          <Text>• Led microservices development improving reliability by 35%.</Text>
          <Text>• Implemented real-time analytics with React & D3.js.</Text>
        </View>

        {/* ✅ Education Section */}
        <View style={styles.section}>
          <Text style={styles.header}>Education</Text>
          <Text>University of California, Berkeley</Text>
          <Text>Bachelor of Science in Computer Science</Text>
          <Text>2012 - 2016 | GPA: 3.8/4.0</Text>
        </View>

        {/* ✅ Skills Section */}
        <View style={styles.section}>
          <Text style={styles.header}>Skills</Text>
          <Text>React, TypeScript, Node.js, AWS, Docker, SQL</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
