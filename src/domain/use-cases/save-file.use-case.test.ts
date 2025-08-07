import { Options, SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {
  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs');
    const customOutputFolderExists = fs.existsSync('custom-outputs');
    if (outputFolderExists) fs.rmSync('outputs', {recursive: true});
    if (customOutputFolderExists) fs.rmSync('custom-outputs', {recursive: true});
  });

  test('should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content'
    }
    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('should save file with custom values', () => {
    const saveFile = new SaveFile();
    const options: Options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name',
    }
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;
    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const options: Options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name',
    }
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => { throw new Error('This is a custom error message from testing'); }
    );
    const result = saveFile.execute(options);
    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });

    test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const options: Options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name',
    }
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => { throw new Error('This is a custom writing error message'); }
    );
    const result = saveFile.execute(options);
    expect(result).toBeFalsy();
    writeFileSpy.mockRestore();
  });
})
