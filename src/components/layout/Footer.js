export default function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className='footer p-10 gb-grey-700 text-primary-content footer-center'>
      <div></div>
      <p>Copyrigth &copy; {footerYear} All right reserved</p>
    </footer>
  );
}
