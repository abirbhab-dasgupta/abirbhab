import fs from 'fs';
import path from 'path';

// Simple .env parser to avoid dependencies
function loadEnv() {
    try {
        // Try .env.local first as per Next.js precedence
        const envLocalPath = path.resolve(process.cwd(), '.env.local');
        const envPath = path.resolve(process.cwd(), '.env');

        let loadedContent = '';

        if (fs.existsSync(envLocalPath)) {
            console.log('📄 Loading .env.local file...');
            loadedContent = fs.readFileSync(envLocalPath, 'utf-8');
        } else if (fs.existsSync(envPath)) {
            console.log('📄 Loading .env file...');
            loadedContent = fs.readFileSync(envPath, 'utf-8');
        } else {
            console.warn('⚠️ No .env or .env.local file found!');
            return;
        }

        loadedContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });

    } catch (error) {
        console.error('❌ Error loading .env:', error);
    }
}

async function main() {
    loadEnv();

    console.log('🔑 Checking RESEND_API_KEY...');
    if (!process.env.RESEND_API_KEY) {
        console.error('❌ RESEND_API_KEY is missing from environment variables');
        // We don't exit here, we let the import fail if it truly needs it, 
        // or we can see if the module handles it.
        // But we know the module throws if missing.
    } else {
        console.log('✅ RESEND_API_KEY found (starts with: ' + process.env.RESEND_API_KEY.substring(0, 5) + '...)');
    }

    // Dynamic import to ensure env vars are set before module execution
    try {
        const { sendContactEmail } = await import('../lib/resend');

        console.log('📨 Sending test email...');

        const testData = {
            fullName: 'Test User (Debug)',
            email: 'test@example.com',
            message: 'This is a test message to verify email delivery functionality.'
        };

        const result = await sendContactEmail(testData);
        console.log('🔍 Result:', JSON.stringify(result, null, 2));

        if (result.success) {
            console.log('✅ Email sent successfully!');
        } else {
            console.error('❌ Failed to send email:', result.error);
        }

    } catch (error) {
        console.error('💥 Exception during execution:', error);
    }
}

main();
